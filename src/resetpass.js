import React from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            password: "",
            emailsubmitted: true,
            codesubmitted: false,
            successfulreset: false,
            error: undefined,
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

        if (this.state.emailsubmitted) {
            return axios
                .post("/password/reset/start", {
                    email: this.state.email,
                })
                .then((results) => {
                    console.log("This is my results in post axios: ", results);
                    this.setState({
                        emailsubmitted: false,
                        codesubmitted: true,
                    });
                })
                .catch((err) => {
                    console.log("my err in axios emailsubmitted: ", err);
                    return this.setState({
                        error:
                            "Sorry! something went wrong. Please check if you have provided correct email!",
                    });
                });
        } else if (this.state.codesubmitted) {
            return axios
                .post("/password/reset/verify", {
                    code: this.state.code,
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((results) => {
                    console.log("This is my results in post axios: ", results);
                    this.setState({
                        codesubmitted: false,
                        successfulreset: true,
                    });
                })
                .catch((err) => {
                    console.log("my err in axios codesubmitted: ", err);
                    return this.setState({
                        error:
                            "The code you have entered doesn't match! Please re-enter the code again or ask for a new code.",
                    });
                });
        }
    }

    getCurrentDisplay() {
        {
            this.state.error && <div className="error">(this.state.error)</div>;
        }

        <p id="insert_details">Please insert your registered email!</p>;

        {
            this.state.emailsubmitted && (
                <div className="emailsubmit">
                    <form method="POST" className="registration_form">
                        <input
                            type="text"
                            className="email"
                            name="email"
                            placeholder="email"
                            value={this.state.value}
                            onChange={(e) => this.handleChange(e)}
                            required
                        />

                        <button
                            className="submit_btn"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            );
        }

        {
            this.state.codesubmitted && (
                <div className="code_submit">
                    <p id="insert_details">
                        Please insert the code that has been sent to your email!
                    </p>
                    <form method="POST" className="registration_form">
                        <input
                            type="text"
                            className="code"
                            name="code"
                            placeholder="code"
                            value={this.state.value}
                            onChange={(e) => this.handleChange(e)}
                            required
                        />
                        <input
                            type="text"
                            className="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={this.state.value}
                            onChange={(e) => this.handleChange(e)}
                            required
                        />

                        <button
                            className="submit_btn"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            );
        }
        {
            this.state.successfulreset && (
                <div className="login_page">
                    <p id="insert_details">
                        Password has been successfully updated.
                    </p>
                    <Link to="/login" className="login_page1">
                        Login Here!
                    </Link>
                </div>
            );
        }
    }
    render() {
        return <div className="info">{this.getCurrentDisplay()}</div>;
    }
}
