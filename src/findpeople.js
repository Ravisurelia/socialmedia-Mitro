import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople(props) {
    const [id, setID] = useState("");
    const [firstname, setFirst] = useState("");
    const [lastname, setLast] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");
    const [info, setInfo] = useState([]);

    if (e.target.value === "") {
        useEffect(() => {
            // console.log(`${first} has been rendered in useEffect!`);
            axios.get(`/users/?q=${firstname || lastname}`).then(({ data }) => {
                // console.log('data from flameegg: ', data);
                setInfo(data);
            });

            // cleanup function - this runs BEFORE every re-render of our component
            // acts as componentWillUnmount
            return () => {
                console.log(`about to replace ${firstname} with a new value`);
            };
        }, [info]);
    } else {
        useEffect(() => {
            // console.log(`${first} has been rendered in useEffect!`);
            axios.get(`/users/?q=${country}`).then(({ data }) => {
                // console.log('data from flameegg: ', data);
                setInfo(data);
            });

            // cleanup function - this runs BEFORE every re-render of our component
            // acts as componentWillUnmount
            return () => {
                console.log(`about to replace ${firstname} with a new value`);
            };
        }, [info]);
    }

    return (
        <div>
            {/* <p>Hello {first}! We are learning hooks today!</p> */}
            <input
                onChange={(e) =>
                    setFirst(e.target.value) || setLast(e.target.value)
                }
                defaultValue={""}
            />
            {/* <input
                placeholder="type country"
                onChange={(e) => setCountry(e.target.value)}
            />
 */}
            <ul>
                {info.map((each, id) => (
                    <li key={id}>{each}</li>
                ))}
            </ul>
        </div>
    );
}
