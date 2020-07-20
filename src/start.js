import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./app";
import { init } from "./socket";

//////=====================================Redux middleware==================================================//////////

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
//////=====================================Redux middleware==================================================//////////

/* const elements = <Welcome />; */
let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    init(store); //here  we are giving access to redux for socket
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    elem = <Welcome />;
}
ReactDOM.render(elem, document.querySelector("main"));
