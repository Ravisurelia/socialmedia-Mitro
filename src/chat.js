import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("here are the last 10 chat messages: ", chatMessages);
    //this will be undefined as we dont have the table in our database

    useEffect(() => {
        console.log(("my element ref", elemRef));
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        /* console.log(("value:", e.target.value));
        console.log("key pressed: ", e.key); */
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("My message:", e.target.value);
            socket.emit("My amazing chat message", e.target.value); //this sends the message to server
            e.target.value = ""; //after sending the message to server we ant to clear the text area
        }
    };
    return (
        <div className="chat-title">
            <p className="chat-title1">Welcome to Mitro-Chat</p>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((each) => (
                        <div key={each.message_id} className="img-message">
                            <div className="one">
                                <img
                                    className="chat-img"
                                    src={each.imgurl || "default_image.png"}
                                />
                                <p className="chat-msg">{each.message}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                className="chat-text"
                placeholder="type your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
