import React, { useState } from "react";
import { isEmpty } from "lodash";

function App_bak() {
  const [password, setPassword] = useState("");
  const [path, setPath] = useState("");

  const handleGenerateContainerClick = async () => {
    const response = await window.api.initializeVeracrypt({
      path,
      password,
    });
    console.log("response from main", response);
  };

  // TODO: Remove and see how you can use the native file picker with electron
  const handleFile = async () => {
    const containerSavePath = await window.api.showNativeSaveDialog({
      title: "new encrypted container",
      // buttonLabel: "Set location",
      defaultPath: "myNewEncryptedContainer.safe",
    });

    if (isEmpty(containerSavePath)) return;
    console.log("containerSavePath", containerSavePath);
    setPath(containerSavePath);
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
        <p>{path}</p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App_bak;
