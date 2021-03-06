import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as sessionActions from "./store/auth";
import * as photosActions from "./store/photos";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/index";
import "./index.css";
import App from "./App";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  // restoreCSRF();

  window.store = store;
  window.sessionActions = sessionActions;
  window.photosActions = photosActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
