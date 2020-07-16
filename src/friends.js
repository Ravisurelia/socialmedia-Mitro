import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsList, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    //for accepted request
    const acceptedRequests = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((each) => each.accepted == true)
    );

    //for pending request
    const pendingRequests = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((each) => each.accepted == false)
    );

    //dispatching the data
    useEffect(() => {
        dispatch(receiveFriendsList());
    }, []);

    if (!acceptedRequests || !pendingRequests) {
        return null;
    }

    return (
        <div className="friends_list">
            {/* ========accepted friends==========
             */}{" "}
            <p className="first-last1">Your Friends</p>
            {acceptedRequests && (
                <div className="accepted_profiles">
                    {acceptedRequests.map((each) => (
                        <div className="myfriends" key={each.id}>
                            <Link to={`/user/${each.id}`}>
                                <img
                                    className="searched-img"
                                    src={each.imgurl || "/default_image.png"}
                                />
                                <p className="first-last-p">
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                className="sendbtn"
                                id="red"
                                onClick={() => dispatch(unfriend(each.id))}
                            >
                                UNFRIEND
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {/* ========Pending friends==========
             */}{" "}
            <p className="first-last2">Pending Friends requests</p>
            {pendingRequests && (
                <div className="accepted_profiles">
                    {pendingRequests.map((each) => (
                        <div className="myfriends" key={each.id}>
                            <Link to={`/user/${each.id}`}>
                                <img
                                    className="searched-img"
                                    src={each.imgurl || "/default_image.png"}
                                />
                                <p className="first-last-p">
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                className="sendbtn"
                                id="green"
                                onClick={() =>
                                    dispatch(acceptFriendRequest(each.id))
                                }
                            >
                                ACCEPT REQUEST
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
