import React from "react";
import axios from "./axios";

export default class OtherProfiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            ProfilePic: "",
            bio: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios.get("/user/:id").then((res) => {
            console.log("getting my res from get users: ", res);
            let image;
            if (!res.data.imgurl) {
                image = "/default_image.png";
            } else {
                image = res.data.imgurl;
            }
            this.setState({
                firstname: res.data.first,
                lastname: res.data.last,
                ProfilePic: image,
                biodraft: res.data.bio,
            });
        });
    }

    render() {
        return (
            <div className="Profile_container">
                <p>
                    Username: {props.firstname} {props.lastname}
                </p>
            </div>
        );
    }
}
