import logo from './logo.svg';
import './App.css';

function Todos1 (props) {
  return (
    <>
     <div class="card text-bg-light mb-3">
      <div class="card-header">{props.header}</div>
      <div class="card-body">
        <h5 class="card-title">Tugas Sekolah</h5>
        <p class="card-text">Tugas Ipa</p>
      </div>
     </div>
    </>
    );
}
function Todos2 (props) {
  return (
    <>
    <div class="card text-bg-light mb-3" >
    <div class="card-header">{props.header}</div>
    <div class="card-body">
        <h5 class="card-title">Rutinitas</h5>
        <p class="card-text">Menyapu halaman depan rumah</p>
    </div>
    </div>
    </>
    );
}
function Todos3 (props) {
  return (
    <>
    <div class="card text-bg-light mb-3" >
    <div class="card-header">{props.header}</div>
    <div class="card-body">
     <h5 class="card-title">Tugas MSIB</h5>
      <p class="card-text">Mengerjakan project akhir</p>
   </div>
   </div>
    </>
    );
}


function App() {
  const name= "Eva";
  return (
  <div className="App" class="card" >
      <h1>Catatan {name}</h1>
      <Todos1 header="05/11/2023"/>
      <Todos2 header="05/11/2023"/>
      <Todos3 header="05/11/2023"/>
  </div>
  );
}

export default App;
