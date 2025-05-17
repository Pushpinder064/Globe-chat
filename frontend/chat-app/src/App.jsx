import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
const server = 'http://localhost:3000';

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socketIo, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    const socketIo = socketClient(server);
    setSocket(socketIo);
    socketIo.on('message', (data) => {
      console.log(`message is ${JSON.stringify(data)}`)
      setChat((prev) => [...prev, data]);
    });
    return () => socketIo.disconnect();
  }, []);

  const handleClick = () => {
    if (message.trim() !== "") {
      socketIo.emit('message', { username, message });
      setMessage('');
    }
  };

  const handleChange = (e) => setMessage(e.target.value);
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setIsUsernameSet(true);
    }
  };

  if (!isUsernameSet) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Enter your username to join Globe Chat</h2>
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '250px',
              marginRight: '10px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#3498db',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Join Chat
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', fontFamily: 'Arial, sans-serif' }}>
        Welcome to Globe message service, {username}
      </h1>
      <div style={{
        border: '3px solid #3498db',
        borderRadius: '10px',
        margin: '20px 100px 10px 10px',
        padding: '20px',
        backgroundColor: '#ecf0f1',
        minHeight: '300px',
        overflowY: 'auto',
        fontFamily: 'sans-serif'
      }}>
        {chat.map((msg, index) => (
          <div key={index} style={{
            padding: '8px 12px',
            marginBottom: '8px',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <strong>{msg.username}: </strong>{msg.message}
          </div>
        ))}
      </div>

      <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Chat</label>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            width: '300px',
            marginRight: '10px'
          }}
        />
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default App;
