import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

// const initialTodos = [{id: 1, title : "hhh", body: "kdfjk"}, {id: 2, title : "kk", body: "fjk"}];


const Addtodos = ({ addTodo, todos, setTodos }) => {
  const [todo, setTodo] = useState({ title: '', body: '' });

  const Name = 'Eva';
  const Judul = 'Tambahkan catatanmu';

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/Home');
  };

  useEffect(() => {
    console.log('Data diubah:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, [setTodos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { ...todo, createdAt: new Date() };
    addTodo(newTodo);
    setTodos([...todos, newTodo]);
    setTodo({
      title: '',
      body: '',
    });
  };

  return (
    <>
      <h1>{Judul} , {Name} ! </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Judul</Form.Label>
          <Form.Control
            type="title"
            placeholder="Judul"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Isi</Form.Label>
          <Form.Control
            type="body"
            placeholder="Isi"
            value={todo.body}
            onChange={(e) => setTodo({ ...todo, body: e.target.value })}
          />
        </Form.Group>

        {todo.title && todo.body ? (
          <Button variant="primary" type="submit">
            Kirim
          </Button>
        ) : (
          <Button variant="danger" disabled type="submit">
            Kirim
          </Button>
        )}
        <br/><br/>
        <Button variant="primary" type="button" className="ToHome" onClick={navigateHome}>
          Lihat Catatan
        </Button>
      </Form>
    </>
  );
};

export default Addtodos;
