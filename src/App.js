import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addtodos from './pages/Addtodos';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import React, { useState } from 'react';



const App = () => {
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState ("");

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
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
            <Route path="/Addtodos"element={<Addtodos addTodo={addTodo} todos={todos} setTodos={setTodos} />} />
            <Route path="/Home" element={<Home todos={todos} setTodos={setTodos} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;