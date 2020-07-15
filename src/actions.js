import axios from "./axios";

export async function receiveFriendsList() {
    const { data } = await axios.get("/friendsList");
    return {
        type: "RECEIVE_FRIENDS_LIST",
        friends: data,
    };
}
export async function acceptFriendRequest(id) {
    await axios.post(`/accept-friend-request/:${id}`);
    return {
        type: "ACCEPT_FRIEND",
        id,
    };
}
export async function unfriend(id) {
    await axios.post(`/end-friendship/:${id}`);
    return {
        type: "UNFRIEND",
        id,
    };
}
