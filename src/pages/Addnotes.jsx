import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/api';
import { addNote } from '../utils/network';

const Addnotes = ({ setNotes }) => {
  const [note, setNote] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  const Name = 'Eva';
  const Judul = 'Tambahkan catatanmu';

  const navigateHome = () => {
    navigate('/Home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addNote({ title: note.title, body: note.body });

      // Menyimpan data yang baru ditambahkan ke dalam state catatan di Home
      setNotes((prevNotes) => [...prevNotes, response.data]);
      console.log(setNotes);

      console.log("Catatan berhasil ditambahkan");
      setNote({
        title: '',
        body: '',
      });

    } catch (error) {
      console.error("Gagal menambahkan catatan:", error.message);
      alert('Gagal menambahkan catatan. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div>
        <Button variant="danger" type="button" className="LogOut" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <div>
        <h1>{Judul} , {Name} ! </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              type="title"
              placeholder="Judul"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Isi</Form.Label>
            <Form.Control
              type="body"
              placeholder="Isi"
              value={note.body}
              onChange={(e) => setNote({ ...note, body: e.target.value })}
            />
          </Form.Group>

          {note.title && note.body ? (
            <Button variant="success" type="submit">
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
      </div>
    </>
  );
};

export default Addnotes;
