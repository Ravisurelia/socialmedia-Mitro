import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople(props) {
    const [latestUsers, setLatestUsers] = useState([]);
    const [myUsers, setMyUsers] = useState([]);
    const [searchedName, setSearchedName] = useState("");

    useEffect(() => {
        if (searchedName == "") {
            axios.get("/latestusers").then(({ data }) => {
                setLatestUsers(data.rows);
            });
        } else {
            if (searchedName !== "") {
                axios
                    .get(`/gettingmatchedusers/?searchedname=${searchedName}`)
                    .then(({ data }) => {
                        console.log(
                            "data from getting matched profiles: ",
                            data.rows
                        );
                        setMyUsers(data.rows);
                    });
            } else {
                setMyUsers([]);
            }
        }
    }, [searchedName]);

    return (
        <div className="find-people">
            <p className="search-people">Search People</p>

            {searchedName == "" && (
                <ul>
                    {latestUsers.map((each, index) => (
                        <li key={index}>
                            <img className="searched-list" src={each.imgurl} />
                            <p>
                                {each.first}
                                {each.last}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                onChange={(e) => setSearchedName(e.target.value)}
                placeholder="Enter Name"
            />
            <ul>
                {myUsers.map((each, index) => (
                    <li key={index}>
                        <img className="searched-list" src={each.imgurl} />
                        <p>
                            {each.first}
                            {each.last}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
