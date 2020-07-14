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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderingBio = this.renderingBio.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.bioEditorIsNotVisible = this.bioEditorIsNotVisible.bind(this);
    }

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

    errorMessage(e) {
        e.preventDefault();
        this.setState({
            error: false,
        });
    }

    bioEditorIsNotVisible(e) {
        e.preventDefault();
        this.setState({
            bioEditorIsVisible: false,
        });
    }

    renderingBio() {
        if (this.state.bioEditorIsVisible) {
            return (
                <div>
                    <textarea
                        rows="5"
                        cols="50"
                        onChange={this.handleChange}
                        onFocus={this.errorMessage}
                        className="mytextarea"
                    ></textarea>
                    <button className="biobtn" onClick={this.handleSubmit}>
                        Save
                    </button>
                    <button
                        className="biobtn"
                        onClick={this.bioEditorIsNotVisible}
                    >
                        Cancel
                    </button>
                </div>
            );
        } else {
            if (this.props.bio) {
                return (
                    <div>
                        <p>{this.props.bio}</p>
                        <button className="biobtn" onClick={this.bioEdit}>
                            Edit
                        </button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <button className="biobtn" onClick={this.bioEdit}>
                            Add Bio
                        </button>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div>
                <div className="bio_editor_container">
                    {this.renderingBio()}
                </div>
                {this.state.errorMessage && (
                    <p>Uppps! Something is wrong! Please reload the page!</p>
                )}
            </div>
        );
    }
}
