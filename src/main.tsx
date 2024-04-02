import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "virtual:svg-icons-register";
import "virtual:uno.css";
import "./index.css";
import AntConfig from "./config/AntConfig.tsx"; // main.ts

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntConfig>
      <App></App>
    </AntConfig>
  </React.StrictMode>
);
