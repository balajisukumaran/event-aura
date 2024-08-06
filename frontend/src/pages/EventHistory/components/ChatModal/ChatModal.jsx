/**
 * Author : Kabilesh Ravi Chandran
 */

import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { modalStyle } from './constant';
import './style.scss';
import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import ChatInterface from '../ChatInterace';
import { db } from '../../../../firebase';
import { AuthorizationContext } from '../../../../context/AuthorizationContext';
import { ChatContext } from '../../../../context/chatContext';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../../../components/Authentication/apiUtils';

const ChatModal = () => {
  const { user, } = useContext(AuthorizationContext);
  const { data, dispatch, } = useContext(ChatContext);
  const [chats, setChats,] = useState([]);
  const [messages, setMessages,] = useState([]);
  const [receiverDetails, setReceiverDetails,] = useState({});
  const [newChat, setNewChat,] = useState('');
  const [receiver, setReceiver] = useState({});
  const { id } = useParams();

  const handleChats = async (receiverDetail) => {
    const chatID = user?.uid > receiverDetail?.uid
      ? user?.uid + receiverDetail?.uid
      : receiverDetail?.uid + user?.uid;
    try {
      const res = await getDoc(doc(db, 'chats', chatID));
      if (!res.exists()) {
        console.log(chatID, user, receiverDetail)
        await setDoc(doc(db, 'chats', chatID), { messages: [], });
        await updateDoc(doc(db, 'userChats', user?.uid), {
          [chatID + '.userInfo']: {
            uid: receiverDetail?.uid,
            displayName: receiverDetail?.displayName,
            emailID: receiver?.emailID,
          },
          [chatID + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', receiverDetail?.uid), {
          [chatID + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.displayName || JSON.parse(localStorage.getItem('userData')).firstname,
            emailID: user?.email || localStorage.getItem('email'),
          },
          [chatID + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReceiverDetails = async () => {
    const qry = query(
      collection(db, 'users'),
      where('email', '==', receiver?.emailID)
    );
    try {
      const qrySnap = await getDocs(qry);
      let receiverDetail = null;
      qrySnap.forEach((doc) => {
        receiverDetail = doc.data();
        setReceiverDetails(doc.data());
      });
      if(Object.keys(user).length) handleChats(receiverDetail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async() => {
      const res = await fetchUserData(id);
      setReceiver({
        emailID: res.email,
        displayName: res.firstname,
        uid: res.id
      })
    };

    if(id) {
      getData();
    }
  }, [id])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user?.uid && getChats();
  }, [user?.uid,]);

  useEffect(() => {
    if (Object.entries(chats)?.length) dispatch({ type: 'CHANGE_USER', payload: Object.entries(chats)?.[0]?.[1]?.userInfo, });
  }, [chats,]);

  useEffect(() => {
    if (Object.keys(receiver).length !== 0) {
      getReceiverDetails();
    }
  }, [receiver,]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId,]);

  const getFirstLetter = (name) => {
    return name?.[0];
  };

  const onSendMsg = async () => {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: newChat,
        senderId: user?.uid,
        date: Timestamp.now(),
      }),
    });
    setNewChat('');
  };

  return (
    <Box sx={modalStyle}>
      <div className='chat-modal-header'>
        <Avatar style={{ backgroundColor: '#FF9A00' }}>{getFirstLetter(receiver?.displayName)}</Avatar>
        <Typography
          className='chat-modal-header-title'
          variant="h6"
          component="h2"
        >
          {receiver?.displayName}
        </Typography>
      </div>
      <Typography
        sx={{ mt: 2, }}
        className='chat-modal-description'
      >
        <ChatInterface
          messages={messages}
          receiver={receiverDetails}
          sender={user}
        />
      </Typography>
      <div className='chat-modal-sender'>
        <TextField
          type='text'
          onChange={(e) => setNewChat(e.target.value)}
          value={newChat}
          className='chat-modal-sender-input'
          onKeyDown={(e) => { if (e.key === 'Enter' && newChat) onSendMsg(); }}
          onFocus={(e) => e.stopPropagation()}
        />
        <Button onClick={newChat ? onSendMsg : null}><i style={{ fontSize: '40px', color: '#FF9A00' }} className="fa-solid fa-paper-plane"></i></Button>
      </div>
    </Box>
  );
};

export default ChatModal;
