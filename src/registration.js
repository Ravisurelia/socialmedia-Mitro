import React from "react";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        };

        /* this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); */
    }
    /*  handleChange(e) {
        this.setState({
            name: e.target.value,
        });
        console.log(this.state.name);
    } */

    render() {
        return (
            <div>
                <p id="insert_details">Please insert your details here!</p>
                <form
                    method="POST"
                    className="registration_form"
                    onChange={this.handleSubmit}
                >
                    <input
                        type="text"
                        className="userinput"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        className="userinput"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        className="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        className="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <input type="hidden" name="_csrf" value="{{csrfToken}}" />

                    <button className="regibtn">Submit</button>

                    <a className="loginpage" href="./login">
                        If you have already register. Login Here!
                    </a>
                </form>
            </div>
        );
    }
}
