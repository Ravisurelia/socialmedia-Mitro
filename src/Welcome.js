import React from "react";
/* import MyReact from "./registration"; */
import Registration from "./registration";

export default function Welcome() {
    return (
        <div className="welcome_main">
            <h1 className="welcome_message">- - Mitro - -</h1>
            <h2 className="slogan">Friends are Sunshine</h2>
            <img src="main_logo.png" className="main_logo"></img>
            <div>
                <Registration />
            </div>
        </div>
    );
}
