import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import "./index.css";
import { App } from "./app";
import { history } from "./_helpers";
import { accountService } from "./_services";
import reportWebVitals from "./reportWebVitals";
import { configureFakeBackend } from "./_helpers";
configureFakeBackend();

accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
