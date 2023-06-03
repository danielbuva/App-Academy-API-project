import React from "react";

import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import configureStore from "./store";
import { csrfFetch, restoreCSRF } from "./store/csrf";
import * as sessionActions from "./store/session";
import { ModalProvider } from "./context/Modal";
import Modal from "./components/Modal";
import { ThemeProvider } from "./context/Theme";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
