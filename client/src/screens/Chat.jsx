// import {  host } from "../utils/APIRoutes";
import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {allUsersRoute,host} from '../api';
import { 
  Contacts,
  Welcome,
  ChatContainer
} from '../components';

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect( () => {
    if (!localStorage.getItem(
      // process.env.REACT_APP_LOCALHOST_KEY
      'chat-user',)
      ) {
        navigate("/login");
    } else {
      setCurrentUser(
         JSON.parse(
          localStorage.getItem(
            // process.env.REACT_APP_LOCALHOST_KEY
            'chat-user',
            )
        )
      );
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(()=>{
    const fetchData=async () => {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            
            const {data} = await  allUsersRoute(currentUser._id);;
            setContacts(data.users);
            console.log(data);
          } else {
            navigate("/setAvatar");
          }
        }
     }
     fetchData();
  }, [currentUser,navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange}  />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
            
          )}
        
      </div>
    </Container>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat