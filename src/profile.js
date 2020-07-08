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
                ProfilePic={props.ProfilePic}
                openModal={props.openModal}
                setImage={props.setImage}
            />
        </div>
    );
}
