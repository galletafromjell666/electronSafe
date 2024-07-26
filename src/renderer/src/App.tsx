import React, { useState } from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");

  const handleGenerateContainerClick = async () => {
    const response = await window.api.initializeVeracrypt({
      path: "E:\\vc_tests_usb\\vctest04x.vc",
      password,
    });
    console.log("response from main", response);
  };

  // TODO: Remove and see how you can use the native file picker with electron
  const handleFile = async () => {
    const dirHandle = await window.showDirectoryPicker();
    console.log("dirHandle", dirHandle);
    if (!dirHandle) {
      // User cancelled, or otherwise failed to open a file.
      return;
    }
    console.log(dirHandle);
  };

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <form>
          <label>
            PATH
            <input name="path" type="file" id="ctrl" multiple />
          </label>
          <label>
            PASSWORD
            <input
              type="password"
              placeholder="password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </label>
        </form>
        <button onClick={() => handleGenerateContainerClick()}>
          Generate new container
        </button>
        <button onClick={() => handleFile()}>test showDirectoryPicker</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
