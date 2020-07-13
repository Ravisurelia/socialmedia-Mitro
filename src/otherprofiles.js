import React from "react";
import axios from "./axios";
import Button from "./friendsrequest";

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
        axios.get(`/api/user/${this.props.match.params.id}`).then((res) => {
            console.log("getting my res from get users in otherprofile: ", res);
            console.log("my res data", res.data);

            if (res.data.match) {
                this.props.history.push("/");
            }

            let image = res.data.imgurl;

            this.setState({
                firstname: res.data.first,
                lastname: res.data.last,
                ProfilePic: image,
                bio: res.data.bio,
            });
        });
    }

    render() {
        return (
            <div className="otherProfile_container">
                <p className="otherprofile_username">
                    Username: {this.state.firstname} {this.state.lastname}
                </p>
                <img
                    src={this.state.ProfilePic || "/default_image.png"}
                    className="otherprofile_img"
                />
                <p className="otherprofile_bio">User Bio: {this.state.bio}</p>

                <Button id={this.props.id}></Button>
            </div>
        );
    }
}
