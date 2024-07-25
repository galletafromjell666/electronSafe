import React, { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("click");
    window.api.sendPingToMainProcess();
    setCount((count) => count + 1);
  };

  const handleGenerateContainerClick = () => {
    window.api.initializeVeracrypt();
  };

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => handleClick()}>count is {count}</button>
        <button onClick={() => handleGenerateContainerClick()}>Generate new container</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
