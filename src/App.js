import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "@redux-store/reducers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@styles/bootstrap-override.scss";
import "@styles/app.scss";
import stringUtils from "mainam-react-native-string-utils";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./Main";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

const Kernel = () => (
  <div>
    <ToastContainer autoClose={3000} />
    <Provider store={store}>
      <Main />
    </Provider>
  </div>
);
export default Kernel;
