import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople(props) {
    const [latestUsers, setLatestUsers] = useState([]);
    const [myUsers, setMyUsers] = useState([]);
    const [searchedName, setSearchedName] = useState("");

    useEffect(() => {
        if (searchedName == "") {
            axios.get("/latestusers").then(({ data }) => {
                console.log("data from getting last 3 profiles: ", data);
                setLatestUsers(data.rows);
            });
        }
    }, []);

    useEffect(() => {
        let abort;
        if (searchedName != "") {
            (async () => {
                const { data } = await axios.get(
                    `/api/gettingMatchingProfiles?searchName=${searchedName}`
                );
                if (!abort) {
                    setMyUsers(data);
                    console.log("data from getting match profiles: ", data);
                    console.log("search names: ", searchedName);
                }
            })();
        } else {
            setMyUsers([]);
        }
        return () => {
            abort = true;
        };
    }, [searchedName]);

    return (
        <div className="find-people">
            <h3 className="search-people">Search People</h3>
            <input
                type="text"
                onChange={(e) => setSearchedName(e.target.value)}
                placeholder="Enter Name"
                className="entername"
            />
            <div>
                {searchedName == "" && (
                    <ul className="three_users">
                        {latestUsers.map((each, index) => (
                            <Link to={`/user/${each.id}`} key={index}>
                                <li className="listof3">
                                    <img
                                        className="searched-img"
                                        src={
                                            each.imgurl || "/default_image.png"
                                        }
                                    />
                                    <p className="first-last">
                                        {each.first} {each.last}
                                    </p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <ul className="three_users1">
                    {myUsers.map((each, index) => (
                        <Link to={`/user/${each.id}`} key={index}>
                            <li className="listof3">
                                <img
                                    className="searched-img"
                                    src={each.imgurl || "/default_image.png"}
                                />
                                <p className="first-last">
                                    {each.first} {each.last}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}
