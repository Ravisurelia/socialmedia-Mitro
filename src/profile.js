import React from "react";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    console.log("props in profile pic", props);
    return (
        <div className="Profile_container">
            <p>
                Username: {props.firstname} {props.lastname}
            </p>
            <ProfilePic
                ProfilePic={this.state.ProfilePic}
                openModal={this.openModal}
                setImage={this.setImage}
            />
        </div>
    );
}
