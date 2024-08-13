import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import App from "./components/App/App";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

