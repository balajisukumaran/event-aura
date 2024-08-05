/**
 * Author : Balaji Sukumaran
 */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./Support.css";

const SupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (role === "ADMIN") {
      fetchTickets(`assigned/${userId}`);
    } else {
      fetchTickets(`created/${userId}`);
    }
  }, [role]);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessagesForTicket(selectedTicket.id);
      setupWebSocket(selectedTicket.id);
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [selectedTicket]);

  const fetchTickets = async (urlSegment) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/ticket/${urlSegment}`
      );
      setTickets(response.data);
    } catch (error) {
      console.error(`Error fetching tickets: ${urlSegment}`, error);
    }
  };

  const fetchMessagesForTicket = async (ticketId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/ticket/${ticketId}/messages`
      );
      setMessages(response.data);
    } catch (error) {
      console.error(`Error fetching messages for ticket: ${ticketId}`, error);
    }
  };

  const setupWebSocket = (ticketId) => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
    }

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);

      const subscription = client.subscribe(
        `/topic/tickets/${ticketId}`,
        (msg) => {
          const newMsg = JSON.parse(msg.body);
          setMessages((prevMessages) => {
            const messageExists = prevMessages.some(
              (message) => message.id === newMsg.id
            );
            if (!messageExists) {
              return [...prevMessages, newMsg];
            }
            return prevMessages;
          });
        }
      );

      subscriptionRef.current = subscription;
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.onWebSocketClose = (event) => {
      console.error("WebSocket closed: " + event);
      setIsConnected(false);
    };

    client.activate();
    stompClientRef.current = client;
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedTicket && isConnected) {
      const message = {
        userId,
        typeUser: role,
        message: newMessage,
        ticketId: selectedTicket.id,
        timestamp: new Date().toISOString(), // Add the timestamp here
      };
      stompClientRef.current.publish({
        destination: `/app/tickets/${selectedTicket.id}/messages`,
        body: JSON.stringify(message),
      });
      setNewMessage("");
    }
  };

  const resolveTicket = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/ticket/${selectedTicket.id}/close`
      );
      setSelectedTicket(null); // Deselect the ticket
      fetchTickets(
        role === "ADMIN" ? `assigned/${userId}` : `created/${userId}`
      );
    } catch (error) {
      console.error("Error closing the ticket", error);
    }
  };

  return (
    <div className="support-page">
      <div className="sidebar">
        <h2>{role === "ADMIN" ? "Assigned Tickets" : "My Tickets"}</h2>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id} onClick={() => setSelectedTicket(ticket)}>
              {ticket.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {selectedTicket ? (
          <div className="chat-window">
            <div className="chat-header">
              <h3>{selectedTicket.name}</h3>
              <button className="resolve-button" onClick={resolveTicket}>
                Resolve
              </button>
            </div>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.userId === userId ? "my-message" : "other-message"
                  }
                >
                  <p>{msg.message}</p>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} disabled={!isConnected}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <p>Select a ticket to view and send messages</p>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
