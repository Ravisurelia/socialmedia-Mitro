import React from "react";

export default class Registration extends React.Component {
    render() {
        return (
            <div>
                <p id="registration">Please insert your details here!</p>,
                <form method="POST">
                    <input
                        type="text"
                        className="userinput"
                        name="firstname"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        className="userinput"
                        name="lastname"
                        placeholder="Last Name"
                    />
                    <input
                        type="text"
                        className="email"
                        name="email"
                        placeholder="email"
                    />
                    <input
                        type="password"
                        className="password"
                        name="password"
                        placeholder="password"
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
