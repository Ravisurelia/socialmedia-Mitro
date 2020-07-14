import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("props in profile pic", props);
    return (
        <div className="Profile_container">
            <div className="pro_picture">
                <ProfilePic
                    ProfilePic={props.ProfilePic}
                    openModal={props.openModal}
                    setImage={props.setImage}
                />
            </div>

            <div className="data-bio">
                <p className="myusername">
                    Username: {props.firstname} {props.lastname}
                </p>
                <BioEditor bio={props.bio} setBio={props.setBio} />
            </div>
        </div>
    );
}
