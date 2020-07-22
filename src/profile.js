import React, { useState } from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import axios from "./axios";

export default function Profile(props) {
    console.log("props in profile pic", props);

    const [deleteModal, setDeleteModal] = useState(false);

    const modalOpen = () => {
        setDeleteModal(true);
    };

    const modalClose = () => {
        setDeleteModal(false);
    };

    const deleteAccount = (e) => {
        e.preventDefault();
        axios
            .post("/deleteAccount")
            .then((res) => {
                console.log("this is my delete res: ", res.data);
                location.replace("/");
            })
            .catch((err) => {
                console.log("this is my delete err:", err);
            });
    };
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
            <button className="sendbtn1" onClick={modalOpen}>
                Delete Profile
            </button>
            {deleteModal && (
                <div>
                    <p className="delete-para">
                        Are you sure you want to delete your profile
                        Permanently? This will delete all your data.
                    </p>
                    <button className="sendbtn2" onClick={deleteAccount}>
                        I agree
                    </button>
                    <button className="sendbtn3" onClick={modalClose}>
                        cancel
                    </button>
                </div>
            )}
        </div>
    );
}
