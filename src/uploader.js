import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
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

    uploadImage(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload", formData)
            .then((results) => {
                console.log("results in my post upload in uploader: ", results);
                this.props.setImage(results.data.imgurl);
                this.props.closeModal();
            })
            .catch((err) => {
                console.log("this is my err in post upload image axios: ", err);
            });
    }

    render() {
        console.log("THIIIIIISSSS: ", this);

        return (
            <div className="uploader_area">
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
                <div className="main_modal">
                    <h3 className="image_header">
                        Please upload your picture here!
                    </h3>
                    <form className="modal-form" onSubmit={this.uploadImage}>
                        <input
                            className="image_file"
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={this.handleChange}
                            onFocus={this.errorMessage}
                        />
                        <button className="upload_btn">upload</button>
                    </form>
                </div>
            </div>
        );
    }
}
