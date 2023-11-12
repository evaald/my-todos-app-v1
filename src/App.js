import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

const array_todos =[];

function Search ({onSearch}) {

  return(
    <>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Search</Form.Label>
        <Form.Control type="search" placeholder="Search" 
        onChange={(e) => 
          onSearch(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
    </>
  );
};

function Addtodos() {
  const name = 'Eva';
  const tanggal_updated = new Date();

  const updatedYear = tanggal_updated.getFullYear();
  const updatedMonth = String(tanggal_updated.getMonth() + 1).padStart(2, '0');
  const updatedDay = String(tanggal_updated.getDate()).padStart(2, '0');
  const formattedUpdatedDate = `${updatedDay}/${updatedMonth}/${updatedYear}`;
  const [todos, setTodos] = useState(array_todos);
  const [todo, setTodo] = useState({
    title: '',
    body: '',
  });
  const [filter, setFilter] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    console.log('Data diubah:', todos);
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [todos, filter]);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo, index) => index !== id);
    setTodos(updatedTodos);
  };

  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };

  const handleSubmit = (e) => {
    setTodos([...todos, todo]); // Menambahkan todo baru ke dalam array todos
    setTodo({
      title: '',
      body: '',
    });
    e.preventDefault();
  };

  return (
    <>
      <h1>Catatan {name}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="body"
            placeholder="Body"
            value={todo.body}
            onChange={(e) => setTodo({ ...todo, body: e.target.value })}
          />
        </Form.Group>

        {todo.title && todo.body ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="danger" disabled type="submit">
            Submit
          </Button>
        )}
      </Form>
      <br />
      <Search onSearch={handleSearch} />
      <br />
      
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
}


function Todos ({ id, createdAt, title, body, onDelete }) {
  return (
    <>
    <br></br>
     <div class="card text-bg-light mb-3">
      <div class="card-header">{createdAt}</div>
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{body}</p>
        <Button variant="primary" type="submit" className="delete"
        onClick={() => onDelete(id)}> 
        Delete
      </Button>
      </div>
     </div>
    </>
    );
};


function App() {
  return (
    <div class="App" className="card">
      <div className="form">
       <Addtodos/>
      </div>
    </div>
  );
}

export default App;