/**
 * Author : Kabilesh Ravi Chandran
 */

import React from 'react';
import { Avatar } from '@mui/material';

const Chat = (props) => {
  const {
    message,
    receiver,
    sender,
  } = props;
  const getInitial = (name) => name?.[0];

  if (message?.senderId === receiver?.uid) {
    return (
      <div className='receiver-chat chat-style'>
        <Avatar className="name-avatar" style={{ backgroundColor: '#FF9A00' }}>{getInitial(receiver?.displayName)}</Avatar>
        <div className='receiver-chat-msg'>{message?.text}</div>
      </div>
    );
  } else if (message?.senderId === sender?.uid) {
    return (
      <div className='sender-chat chat-style'>
        <Avatar className="name-avatar" style={{ backgroundColor: '#FF9A00' }}>{getInitial(sender?.displayName || JSON.parse(localStorage.getItem('userData')).firstname)}</Avatar>
        <div className='sender-chat-msg'>{message?.text}</div>
      </div>
    );
  }
};

const ChatInterface = (props) => {
  const {
    messages,
    receiver,
    sender,
  } = props;

  return (
    <div className='chat-interface'>
      {
        messages?.map((message) => (
          <Chat
            message={message}
            receiver={receiver}
            sender={sender}
            key={message?.id}
          />
        ))
      }
    </div>
  );
};

export default ChatInterface;
