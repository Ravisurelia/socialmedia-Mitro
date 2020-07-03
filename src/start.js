import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";

const elements = <Welcome />;
ReactDOM.render(
    //this is my react component
    elements, // here is says create a hello world component
    document.querySelector("main")
);
/* 
function HelloWorld() {
    //this is my definition of my component hello world
    //here we can use the class but for a moment we will use function
    //we will not use the class until we need it
    //main job of this function is to return the component
    //to set a style we create an object and then we pass that to a style
    //if you wanna use for loop you can use outside of jsx and then pass the value in jsx
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

function MyReact(props) {
    return (
        <strong>
            {props.name}
            {props.name == "React" && <h1>!!!!</h1>}
        </strong>
        //if you change the name then !!! marks will not show up
        //this is called conditional rendering
    );
} */
