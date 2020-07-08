import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            bioEditorIsVisible: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            text: e.target.value,
        });
        console.log("BIO EDITOR HANDLE CHANGE:", this.state);
    }

    onSubmit(e) {
        this.setState({
            bioEditorIsVisible: true,
        });
    }

    getting_data(e) {
        e.preventDefault();
    }
}
