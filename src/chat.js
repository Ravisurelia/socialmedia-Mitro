import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("her are the last 10 chat messages: ", chatMessages);
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
            console.log("My message:", e.target.values);
            socket.emit("My amazing chat message", e.target.value); //this sends the message to server
            e.target.value = ""; //after sending the message to server we ant to clear the text area
        }
    };
    return (
        <div>
            <p className="chat-title">Welcome to chat</p>
            <div className="chat-container" ref={elemRef}>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>
                <p>chat message will go here</p>

                <textarea
                    className="chat-text"
                    placeholder="type your message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
