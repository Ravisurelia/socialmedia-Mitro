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

        axios
            .post("/upload", formData)
            .then((results) => {
                console.log("results in my post upload in uploader: ", results);
                this.props.setImage(results.data.imgUrl);
                this.props.closeModal();
            })
            .catch((err) => {
                console.log("this is my err in post upload image axios: ", err);
            });
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <p className="para">
                        Profile picture is mandatory for identification!
                    </p>
                )}
                <div>
                    <p className="modal-X" onClick={this.props.closeModal}>
                        X
                    </p>
                </div>
                <div>
                    <h3>Please upload your picture here!</h3>
                    <form className="modal-form">
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <button className="submit_btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
