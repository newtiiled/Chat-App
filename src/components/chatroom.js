import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';

// Required scripts
import auth from '../background/config';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }
  
  async componentDidMount() {
    try {
      const db = getDatabase();
      const roomRef = ref(db, `/room/${this.props.roomID}`);
      onValue(roomRef, (snapshot) => {
        var chat = [];
        snapshot.forEach((snap) => {
          chat.push(snap.val());
        });
        this.setState({ chat });
      });

    } catch (error) {
      alert(error);
    }
  }

  async sendMessage(event) {
    event.preventDefault();
    try {
      const value = document.getElementById('text').value;
      if (value !== '') {
        const db = getDatabase();
        const roomRef = ref(db, `/room/${this.props.roomID}`);

        await push(roomRef, {
          content: value,
          time: Date.now(),
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
        });
        document.getElementById('text').value = '';

      } else {
        alert('Empty input');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  render() {
    return (
      <div>
        <section className='text-center pt-5' id='room-header'>
          <h1>Your Chat</h1>
          <Button
            className='w-50'
            variant='outline-dark'
            onClick={() => {
              try {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied');
              } catch (error) {
                alert(error);
              }
            }}
          >
            Share Room
          </Button>
          <Button
            className='w-50'
            variant='outline-dark'
            onClick={() => {
              if (this.props.roomID !== 'All-Chat') {
                console.log('hi');
                const db = getDatabase();
                const roomRef = ref(db, `/room/${this.props.roomID}`);

                set(roomRef, null)
                  .then(() => {
                    const chatRef = ref(db, `/users/${this.props.user['uid']}/rooms/${this.props.roomID}`);
                    
                    set(chatRef, null)
                      .then(() => {
                        alert('Room deleted!');
                        window.location.replace('/home');
                      });
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }
            }}
          >
            Delete Room
          </Button>
        </section>
        <section className='mt-5'>
          <div className='message-form '>
            <div className='inner-msgs'>
              {this.state.chat.map((chat) => {
                if (chat.uid !== auth.currentUser.uid) {
                  return (
                    <span key={chat.time}>
                      <p>
                        {chat.content}
                        <br />
                        <span id='sender'>Sent by: {chat.email}</span>
                      </p>
                    </span>
                  );
                } else {
                  return (
                    <span key={chat.time}>
                      <p id='sender-me'>
                        {chat.content}
                        <br />
                        <span id='sender'>Sent by: You</span>
                      </p>
                    </span>
                  );
                }
              })}
            </div>
          </div>
          <Form
            onSubmit={this.sendMessage}
            className='sticky-bottom msg-box mt-2'
          >
            <Form.Group>
              <Form.Control type='text' placeholder='Enter message' id='text' />
            </Form.Group>
            <Button variant='success' type='submit' className='w-100'>
              Send
            </Button>
          </Form>
        </section>
      </div>
    );
  }
}

export default Chatroom;