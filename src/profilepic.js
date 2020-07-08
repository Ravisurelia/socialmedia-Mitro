import React from "react";

export default function ProfilePic(props) {
    console.log("props in profile pic", props);
    //when you see this the object containing 3 details then render the info
    //users who register and see APP for the first time will not have a profile pic
    //so if the profile pic is undefined in your props it means the user does nit have a profile pic
    //if the user doesn't have the profile pic we have to give a default image and render it
    //how can we render a default a default profile picture for the user??
    //hint: don't over think this...if var is undefined we just need to give it a value

    return (
        <div className="profilepic">
            <img
                className="profile_image"
                src={props.ProfilePic}
                onClick={props.openModal}
            />
        </div>
    );
}
