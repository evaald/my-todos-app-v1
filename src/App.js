import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addnotes from './pages/Addnotes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import React, { useState } from 'react';



const App = () => {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState ("");

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const addUsername = (newUsername) => {
    setUsername([...username, newUsername]);
  };

  const addPassword = (newPassword) => {
    setPassword([...password, newPassword]);
  };

  return (
    <div className="card">
      <div className="form">
        <BrowserRouter>
          <Routes>
            <Route path="/" 
            element={<Login username={addUsername} setUsername={setUsername} password={addPassword} setPassword={setPassword}/>} />
            <Route path="/Register" 
            element={<Register username={addUsername} setUsername={setUsername} password={addPassword} setPassword={setPassword}/>} />
            <Route path="/Addnotes"element={<Addnotes addNote={addNote} notes={notes} setNotes={setNotes} />} />
            <Route path="/Home" element={<Home notes={notes} setNotes={setNotes} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;