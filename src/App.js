import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addtodos from './pages/Addtodos';
import Home from './pages/Home';
import React, { useState } from 'react';



const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="card">
      <div className="form">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Addtodos addTodo={addTodo} todos={todos} setTodos={setTodos} />}
            />
            <Route path="/Home" element={<Home todos={todos} setTodos={setTodos} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;