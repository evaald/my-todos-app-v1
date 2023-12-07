import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { login, getAccessToken } from '../utils/network';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate('/Register');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({ username, password });
  
      // Jika login berhasil
      if (!response.error) {
        console.log(getAccessToken());
        // Redirect ke halaman Addtodos
        navigate('/Addnotes');
      } else {
        console.error("Login gagal:", response);
        alert("Login Gagal. Periksa kembali username dan password");
      }
    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return (
    <>
      <h1>Selamat Datang di Catatanmu</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        
        <br/><br/>
        <h5>Belum punya akun?</h5>
        <Button variant="success" type="button" className="ToRegister" onClick={navigateRegister}>
          Daftar
        </Button>
      </Form>
    </>
  );
}

export default Login;
