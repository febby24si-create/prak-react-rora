import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <h1>RORA</h1>
        <p className="subtitle">Modern React App</p>

        <button className="btn" onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </button>

        <p className="info">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;