import React from "react";
import MyReact from "./MyReact";
export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let style = {
            color: "red",
            textDecoration: "bold",
        };
        return (
            <div className="awesome" style={style}>
                Hello, World!, <MyReact name="React" />
            </div> //this is jsx
        );
    }
}
