import logo from './logo.svg';
import './App.css';

function Todos (props) {
  return (
    <>
     <div class="card text-bg-light mb-3">
      <div class="card-header">{props.createdAt}</div>
      <div class="card-body">
        <h5 class="card-title">{props.title}</h5>
        <p class="card-text">{props.body}</p>
      </div>
     </div>
    </>
    );
}

function App() {
  const name= "Eva";
  const tanggal_updated = new Date();

  const updatedYear = tanggal_updated.getFullYear();
  const updatedMonth = String(tanggal_updated.getMonth() + 1).padStart(2, "0");
  const updatedDay = String(tanggal_updated.getDate()).padStart(2, "0");
  const formattedUpdatedDate = `${updatedDay}/${updatedMonth}/${updatedYear}`;

  return (
  <div className="App" class="card" >
      <h1>Catatan {name}</h1>
      <Todos createdAt={formattedUpdatedDate} title="Tugas Sekolah" body="Mengerjakan tugas Ipa"/>
      <Todos createdAt={formattedUpdatedDate} title="Rutinitas" body="Menyapu"/>
      <Todos createdAt={formattedUpdatedDate} title="MSIB" body="Mengerjakan tugas Week 12"/>
  </div>
  );
}

export default App;
