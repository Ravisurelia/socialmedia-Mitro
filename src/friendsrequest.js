import React, { useState, useEffect, handleClick } from "react";
import axios from "./axios";

export default function Button(props) {
    console.log("THIS IS MY PROPS:ID. ", props.id);

    const [buttonText, setButtonText] = useState("SEND REQUEST");

    const handleClick = (e) => {
        e.preventDefault();
        if (buttonText === "SEND REQUEST") {
            axios
                .post(`/make-friend-request/${props.id}`)
                .then((res) => {
                    console.log("MY POST MAKE FRIEND REQ RES:", res.data);
                    setButtonText("CANCEL REQUEST");
                })
                .catch((err) => {
                    console.log("ERR IN MY AXIOS POST MAKE REQ: ", err);
                });
        } else if (buttonText === "ACCEPT REQUEST") {
            axios
                .post(`/accept-friend-request/${props.id}`)
                .then((res) => {
                    console.log("MY POST ACCEPT FRIEND REQ RES:", res.data);
                    setButtonText("UNFRIEND");
                })
                .catch((err) => {
                    console.log(
                        "ERR IN MY AXIOS POST ACCEPT FRIENDS REQ: ",
                        err
                    );
                });
        } else if (
            buttonText === "CANCEL REQUEST" ||
            buttonText === "UNFRIEND"
        ) {
            axios
                .post(`/end-friendship/${props.id}`)
                .then((res) => {
                    console.log("MY POST UNFRIEND REQ RES:", res.data);
                    setButtonText("SEND REQUEST");
                })
                .catch((err) => {
                    console.log("ERR IN MY AXIOS POST UNFRIENDS REQ: ", err);
                });
        }
    };

    useEffect(() => {
        axios
            .get(`/get-initial-status/${props.id}`)
            .then((res) => {
                console.log("MY GET INITIAL STATUS RES:", res.data);
                if (res.data.Friendship) {
                    setButtonText("UNFRIEND");
                } else if (res.data.Accepted) {
                    setButtonText("ACCEPT REQUEST");
                } else {
                    if (res.data.Pending) {
                        setButtonText("CANCEL REQUEST");
                    } else {
                        setButtonText("SEND REQUEST");
                    }
                }
            })
            .catch((err) => {
                console.log(("ERR IN MY GET AXIOS INITIAL STATUS.", err));
            });
    }, []);

    return (
        <div>
            <button className="req_button" onClick={handleClick}>
                {buttonText}
            </button>
        </div>
    );
}
