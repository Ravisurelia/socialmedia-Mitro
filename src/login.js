import React from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }

    handleChange(e) {
        let name = e.target.name;
        let val = e.target.value;

        this.setState({
            [name]: val,
        });
        console.log("This is my this.state:", this.state);
    }

    handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((results) => {
                console.log("This is my results in post axios: ", results);
                location.replace("/");
            })
            .catch((err) => {
                console.log("my err in axios: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="info">
                {this.state.error && (
                    <div className="error">
                        Upps.....Email or password did not match. Have you
                        registered already?
                    </div>
                )}
                <p id="insert_details">Sign up!</p>
                <form method="POST" className="registration_form">
                    <input
                        type="text"
                        className="email"
                        name="email"
                        placeholder="email"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        className="password"
                        name="password"
                        placeholder="password"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />

                    <button
                        className="submit_btn"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
                <div className="login_page">
                    If you have not register yet!
                    <Link to="/" className="login_page1">
                        Register Here!
                    </Link>
                </div>
                <div className="reset_pass">
                    forgot your password?
                    <Link to="/password/reset/start" className="reset_pass1">
                        Reset Here!
                    </Link>
                </div>
            </div>
        );
    }
}
