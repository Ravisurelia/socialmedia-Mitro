import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            biodraft: "",
            bioEditorIsVisible: false,
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.bioEdit = this.bioEdit.bind(this);
        /* this.errorMessage = this.errorMessage.bind(this); */
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderingBio = this.renderingBio.bind(this);
    }

    /* errorMessage(e) {
        this.setState({
            error: true,
        });
    } */

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.biodraft != "") {
            axios
                .post("/bioeditor", { bio: this.state.biodraft })
                .then((results) => {
                    console.log("results in my bio editor: ", results);
                    this.props.setBio(this.state.biodraft);
                    this.setState({
                        bioEditorIsVisible: false,
                    });
                })
                .catch((err) => {
                    console.log("MY ERR IN HANDLESUBMIT BIOEDITOR: ", err);
                });
        }
        this.setState({
            bioEditorIsVisible: false,
        });
    }

    bioEdit(e) {
        this.setState({
            bioEditorIsVisible: true,
        });
    }

    handleChange(e) {
        this.setState({
            biodraft: e.target.value,
        });
        console.log("BIO EDITOR HANDLE CHANGE:", this.state);
    }

    renderingBio() {
        if (this.state.bioEditorIsVisible) {
            return (
                <div>
                    <textarea onChange={this.handleChange}></textarea>
                    <button onClick={this.handleSubmit}>Save</button>
                </div>
            );
        } else {
            if (this.props.bio) {
                return (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={this.bioEdit}>Edit</button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <button onClick={this.bioEdit}>Add Bio</button>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div className="bio_editor_container">{this.renderingBio()}</div>
        );
    }
}
