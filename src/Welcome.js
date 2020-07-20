import React from "react";
/* import MyReact from "./registration"; */
import Registration from "./registration";
import axios from "./axios";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetpass";

export default function Welcome() {
    return (
        <div className="welcome_main">
            <div className="welcome_info">
                <h1 className="welcome_message anim-typewriter">
                    - - Mitro - -
                </h1>
                <h2 className="slogan">Friends are Sunshine</h2>
                <img src="main_logo.png" className="main_logo"></img>
            </div>

            {/* <section><Registration /></section> */}
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpass" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
