import React, { useEffect } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';

// Required scripts
import { useAuthContext } from '../background/auth';
import Navigation from '../components/navbar';

const HomePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const navRoom = () => {
    navigate(`/room/test2`);
  };

  const addRoomRow = (chatName) => {
    const newRow = document
      .getElementsByTagName('table')[0]
      .insertRow(document.getElementsByTagName('table')[0].rows.length);
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<Button ${onclick={}}>${chatName}</Button>`;
  };

  const getChatrooms = () => {
    const db = getDatabase();
    const chatMsgRef = ref(db, `users/${user['uid']}/rooms`);
    onValue(chatMsgRef, (snapshot) => {
      const chats = snapshot.val();
      const num = Object.keys(chats).length;
      if (num > 0) {
        for (var i = 0; i < Object.keys(chats).length; i++) {
          addRoomRow(Object.values(chats)[i].room);
        }
      } else {
        addRoomRow('No chats...');
      };
    });
  };

  const createRoom = (event) => {
    event.preventDefault();
    const val = document.getElementById('roomID').value;
    const db = getDatabase();
    const updates = {};
    updates[`/users/${user['uid']}/rooms/${val}`] = { room: val };

    update(ref(db), updates)
      .then(() => {
        navigate(`/room/${val}`);
      })
      .catch((error) => {
        alert(error);
      });

  };

  useEffect(() => {
    getChatrooms();
  });

  return (
    <div className='bg'>
      <Navigation />
      <Container className='wrapper'>
        <Row className='mt-5'>
          <Col sm={8}>
            <Table striped bordered hover variant='light'>
              <thead>
                <tr>
                  <th>Chats</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Col>
          <Col sm={4}>
            <Form onSubmit={createRoom}>
              <Form.Group className='mb-3' controlId='roomID'>
                <Form.Label>Room ID</Form.Label>
                <Form.Control type='text' placeholder='Enter ID' />
                <Form.Text className='text-muted'>
                  Room ID needs to be unique.
                </Form.Text>
              </Form.Group>
              <Button variant='success' type='submit'>
                Submit Room
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;