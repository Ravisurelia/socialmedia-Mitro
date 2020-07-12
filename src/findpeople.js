import React, { useState, useEffect } from "react";
import axios from "./axios";

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
            />
            <div className="three_users">
                {searchedName == "" && (
                    <ul>
                        {latestUsers.map((each, index) => (
                            <li key={index}>
                                <img
                                    className="searched-list"
                                    src={each.imgurl}
                                />
                                <p>
                                    {each.first} {each.last}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="searched_people">
                <ul>
                    {myUsers.map((each, index) => (
                        <li key={index}>
                            <img className="searched-list" src={each.imgurl} />
                            <p>
                                {each.first} {each.last}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
