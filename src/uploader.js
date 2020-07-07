import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //when the user selects an image
    //store that image in state
    //you need to put the code from imageboard to here
    //store the file in FromData
    //Once the file is in form data we can send file off to server
    //we want user to see the image without refreshing the page
    demoMethod() {
        this.props.setImage("should put the image url here");
    }

    render() {
        return <div>my uploader</div>;
    }
}
