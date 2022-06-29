// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");

  function submit() {
    axios.post('http://localhost:4000', {
      name
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="App">
      <input onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default App;
