import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Importa o CSS do Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Importa o JavaScript do Bootstrap para habilitar o Toggler, Modals, etc.
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- ADICIONE ESTA LINHA

import "../css/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);