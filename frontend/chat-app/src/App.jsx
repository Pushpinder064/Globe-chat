
import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
const server = 'http://localhost:3000';

function App(){

const [message,setmessage] = useState("");
const [chat , setchat] = useState([]);
const [socketIo,setSocket] = useState(null);
  
useEffect(()=>{

  const socketIo = socketClient(server);
  setSocket(socketIo);
  socketIo.on('message',(data)=>{
    console.log(`message is ${JSON.stringify(data)}`)
    setchat((prev)=>[...prev,data]);
   
  })
  return () => socketIo.disconnect();
}
,[]);

const handleclick=(message)=>{
socketIo.emit('message',{message});
setmessage(''); 
};

const handlechange=(e)=>{
setmessage(e.target.value);
};

return (
  <>
    <h1 style={{ textAlign: 'center', color: '#2c3e50', fontFamily: 'Arial, sans-serif' }}>
      Welcome to Globe Chat
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
          {msg.message}
        </div>
      ))}
    </div>

    <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Chat</label>
      <input
        type="text"
        value={message}
        onChange={handlechange}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '300px',
          marginRight: '10px'
        }}
      />
      <button
        onClick={() => { handleclick(message) }}
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