import * as io from "socket.io-client";

/* import { chatMessages, chatMessage } from "./actions"; */

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        /* socket.on("addChatMessage", (message) => {
            console.log(
                `Got a message on the client side and now i am gonna do the whole redux thing and my message is ${message}`
            );
        }); */

        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
    }
};
