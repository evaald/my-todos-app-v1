// components/auth/Register.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { register } from '../utils/api'; // Update import
import { useNavigate } from 'react-router-dom'; // Import useNavigate


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleRegister = async () => {
  
    try {
        const response = await register({ username, password });

        // Periksa apakah respons memiliki status 200
        if (response) {
            navigate('/Addtodos')
        } else {
            console.error("Gagal mendaftar. Pastikan bahwa username atau password belum terdaftar");
        }
    } catch (error) {
        console.error("Gagal mendaftar:", error.message);
    }
};





  return (
    <>
      <h1>Daftarkan Dirimu di Todos App</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleRegister}>
          Daftar
        </Button>
      </Form>
    </>
  );
}

export default Register;
