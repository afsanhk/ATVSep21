import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import AuthProvider from "providers/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
