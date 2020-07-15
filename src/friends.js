import React, { useEffect } from "react";
// import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsList, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    //for accepted request
    const acceptedRequests = useSelector((state) => {
        state.friends.filter((each) => {
            each.accepted == true;
        });
    });

    //for pending request
    const pendingRequests = useSelector((state) => {
        state.friends.filter((each) => {
            each.accepted == false;
        });
    });

    //dispatching the data
    useEffect(() => {
        dispatch(receiveFriendsList());
    }, []);

    return (
        <div className="friends_list">
            {acceptedRequests && (
                <div className="accepted_profiles">
                    {acceptedRequests.map((each) => (
                        <div className="myfriends" key={each.id}>
                            <Link to={`/user/:${each.id}`}>
                                <img
                                    className="searched-img"
                                    src={each.imgurl}
                                />
                                <p className="first-last">
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button onClick={() => dispatch(unfriend(each.id))}>
                                ACCEPT REQUEST
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {pendingRequests && (
                <div className="accepted_profiles">
                    {pendingRequests.map((each) => (
                        <div className="myfriends" key={each.id}>
                            <Link to={`/user/:${each.id}`}>
                                <img
                                    className="searched-img"
                                    src={each.imgurl}
                                />
                                <p className="first-last">
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
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
