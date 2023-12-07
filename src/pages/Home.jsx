import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { deleteNote, getNotes } from '../utils/network';
import { logout } from '../utils/api';

const Home = ({ notes, setNotes }) => {
  const name = 'Eva';

  const tanggal_updated = new Date();

  const updatedYear = tanggal_updated.getFullYear();
  const updatedMonth = String(tanggal_updated.getMonth() + 1).padStart(2, '0');
  const updatedDay = String(tanggal_updated.getDate()).padStart(2, '0');
  const formattedUpdatedDate = `${updatedDay}/${updatedMonth}/${updatedYear}`;

  const [filter, setFilter] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  const navigate = useNavigate();

  const navigateaddNotes = (e) => {
    e.preventDefault();
    navigate('/Addnotes');
  };

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(filter.toLowerCase()) ||
          note.body.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [notes, filter]);

  const handleDelete = async (id) => {
    try {
      // Menghapus catatan dari server dengan memanggil fungsi deleteNote
      await deleteNote(id);

      // Mengupdate state todos setelah berhasil menghapus catatan dari server
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);

      console.log(`Catatan dengan id: ${id} berhasil dihapus`);
    } catch (error) {
      console.error("Gagal menghapus catatan:", error.message);
    }
  };

  const handleGetnotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data); // Pastikan untuk mengakses data dari respons
      console.log("Catatan berhasil ditampilkan");
    } catch (error) {
      console.error("Gagal menampilkan catatan:", error.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Logika pencarian dapat ditambahkan di sini jika diperlukan
    // Misalnya, Anda bisa memperbarui filteredNotes dengan hasil pencarian
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div>
        <Button variant="danger" type="button" className="ToAddTodos" onClick={navigateaddNotes}>
          Back
        </Button>
      </div>

      <div>
        <Button variant="danger" type="button" className="LogOut" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <h1>Catatan {name}</h1>

      <Form onSubmit={handleSearchSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cari</Form.Label>
          <Form.Control
            type="search"
            placeholder="Cari"
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cari
        </Button>
      </Form>

      {filteredNotes.map((note, id) => (
        <Notes
          key={id}
          createdAt={formattedUpdatedDate}
          title={note.title}
          body={note.body}
          onDelete={() => handleDelete(note.id)}
        />
      ))}
    </>
  );
};

function Notes({ createdAt, title, body, onDelete }) {
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
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
