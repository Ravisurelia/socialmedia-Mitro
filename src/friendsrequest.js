import React, { useState, useEffect, handleClick } from "react";
import axios from "./axios";

export default function Button(props) {
    console.log("THIS IS MY PROPS:ID. ", props.id);

    const [buttontext, setButtonText] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        if (buttontext === "SEND REQUEST") {
            axios
                .post(`/make-friend-request/${props.id}`)
                .then((res) => {
                    console.log("MY POST MAKE FRIEND REQ RES:", res.data);
                    setButtonText("CANCEL REQUEST");
                })
                .catch((err) => {
                    console.log("ERR IN MY AXIOS POST MAKE REQ: ", err);
                });
        } else if (buttontext === "ACCEPT REQUEST") {
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
            buttontext === "CANCEL REQUEST" ||
            buttontext === "UNFRIEND"
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
        axios.get(`/get-initial-status/${props.id}`).then((res) => {
            console.log("MY GET INITIAL STATUS RES:", res.data);
            if (res.data.Friendship) {
                setButtonText("UNFRIEND");
            } else if (res.data.Accept) {
                setButtonText("ACCEPT REQUEST");
            } else if (res.data.Pending) {
                setButtonText("CANCEL REQUEST");
            } else {
                setButtonText("SEND REQUEST");
            }
        });
    });

    return (
        <div>
            <Button className="req_button" Onclick={handleClick}>
                {buttontext}
            </Button>
        </div>
    );
}
