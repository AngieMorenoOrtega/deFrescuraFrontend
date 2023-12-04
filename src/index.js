import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ClienteProvider } from "../src/client";
import { DateProvider } from "../src/date";

ReactDOM.render(
  <React.StrictMode>
    <ClienteProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </ClienteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
