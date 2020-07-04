import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
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
            .post("/registration", {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            })
            .then((results) => {
                console.log("This is my results in post axios: ", results);
                location.replace("/");
            })
            .catch((err) => {
                console.log("my err in axios: ", err);
                this.state({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="registration_form">
                <p id="insert_details">Please insert your details here!</p>
                <form method="POST" className="regi_form">
                    <input
                        type="text"
                        className="userinput"
                        name="firstname"
                        placeholder="First Name"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        className="userinput"
                        name="lastname"
                        placeholder="Last Name"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
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
                        className="regibtn"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Submit
                    </button>

                    <a className="loginpage" href="./login">
                        If you have already register. Login Here!
                    </a>
                </form>
                {this.state.error && (
                    <div className="error">ALL FIELDS ARE REQUIRED!!</div>
                )}
            </div>
        );
    }
}
