// Home.jsx

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Home = ({ todos, setTodos }) => {
  const name = 'Eva';
  const tanggal_updated = new Date();

  const updatedYear = tanggal_updated.getFullYear();
  const updatedMonth = String(tanggal_updated.getMonth() + 1).padStart(2, '0');
  const updatedDay = String(tanggal_updated.getDate()).padStart(2, '0');
  const formattedUpdatedDate = `${updatedDay}/${updatedMonth}/${updatedYear}`;

  const [filter, setFilter] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);

  const navigate = useNavigate();

  const navigateaddTodos = (e) => {
    e.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    setFilteredTodos(
      todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(filter.toLowerCase()) ||
          todo.body.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [todos, filter]);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo, index) => index !== id);
    setTodos(updatedTodos);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <>
    <div>
      <Button variant="danger" type="button" className="ToAddTodos" onClick={navigateaddTodos}>
        Back
      </Button>
      </div>
      
      <h1>Catatan {name}</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cari</Form.Label>
          <Form.Control
            type="search"
            placeholder="Cari"
            onChange={(e) => handleSearch(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cari
        </Button>
      </Form>

      {filteredTodos.map((todo, index) => (
        <Todos
          key={index}
          id={index}
          createdAt={formattedUpdatedDate}
          title={todo.title}
          body={todo.body}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </>
  );
};

function Todos({ id, createdAt, title, body, onDelete }) {
  return (
    <>
      <br />
      <div className="card text-bg-light mb-3">
        <div className="card-header">{createdAt}</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <Button
            variant="primary"
            type="submit"
            className="delete"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
