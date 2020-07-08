import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            error: false,
        };
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    errorMessage(e) {
        this.setState({
            error: false,
        });
    }
    //when the user selects an image
    //store that image in state
    //you need to put the code from imageboard to here
    //store the file in FromData
    //Once the file is in form data we can send file off to server
    //we want user to see the image without refreshing the page
    uploadImage(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);

        axios.post("/upload", formData).then((results) => {
            console.log("results in my post upload in uploader: ", results);
            this.props.setImage(results.data.imgUrl);
            this.props.closeModal();
        });
    }

    render() {
        return <div>my uploader</div>;
    }
}
