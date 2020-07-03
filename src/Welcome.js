import React from "react";
/* import MyReact from "./registration"; */
import Registration from "./registration";


export default function Welcome(props) {
/*     constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    } */
    render() {
        return (
            <div>
                <h1>Hello, This is new React project!!!</h1>
                <Registration />
            </div>
            
        );
    };
}
