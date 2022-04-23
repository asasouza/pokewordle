import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { PokeWordleProvider } from "./contexts/PokeWordle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <PokeWordleProvider>
      <App />
    </PokeWordleProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
