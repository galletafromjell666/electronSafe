import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
