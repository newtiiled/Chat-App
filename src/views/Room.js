import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Required scripts
import Navigation from "../components/navbar";
import ChatRoom from "../components/chatroom";
import { useAuthContext } from "../background/auth";

const RoomApp = () => {
  const { user } = useAuthContext();
  const { roomID } = useParams();

  return (
    <div className="bg">
      <Navigation />
      <Container className="wrapper">
        <ChatRoom
          user={user}
          roomID={roomID}
        />
      </Container>
    </div>
  );
};

export default RoomApp;