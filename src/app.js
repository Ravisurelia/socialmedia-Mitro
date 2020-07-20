import React from "react";
import axios from "./axios";

import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfiles from "./otherprofiles";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./findpeople";
import { Link } from "react-router-dom";
import Friends from "./friends";
import Chat from "./chat";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.openModal = this.openModal.bind(this); //this we want to use in profilepic as it should open when you click on the profilepic;
        this.setImage = this.setImage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    //lifecycle methods
    componentDidMount() {
        axios.get("/user").then((res) => {
            console.log("getting my res from get users: ", res);
            let image;
            if (!res.data.imgurl) {
                image = "/default_image.png";
            } else {
                image = res.data.imgurl;
            }
            this.setState({
                userId: res.data.id,
                firstname: res.data.first,
                lastname: res.data.last,
                ProfilePic: image,
                biodraft: res.data.bio,
            });
        });
    }

    openModal() {
        console.log("openModal works: ");
        this.setState({
            uploaderIsVisible: true,
        });
    }
    closeModal() {
        console.log("closeModal works: ");
        this.setState({
            uploaderIsVisible: false,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            ProfilePic: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            biodraft: newBio,
        });
    }
    render() {
        /* console.log("this is my state: ", this.state);
        console.log("this is my first:", this.state.first);
        console.log("this is my last:", this.state.last);
        console.log("this is my ProfilePic:", this.state.ProfilePic); */

        return (
            <div className="profile_picture">
                <BrowserRouter>
                    <div className="navbar">
                        <img src="/tree.png" className="tree_logo" />

                        <a href="/users" className="find">
                            Find People
                        </a>

                        <a href="/friends" className="find">
                            Friends-List
                        </a>

                        <a href="/chat" className="find">
                            My Chat
                        </a>
                        <a href="/logout" className="logout">
                            Logout
                        </a>
                        <Link to="/">
                            <img
                                className="small_pic"
                                src={this.state.ProfilePic}
                            />
                        </Link>
                    </div>

                    {!this.state.uploaderIsVisible && (
                        <div className="myprofile">
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        ProfilePic={this.state.ProfilePic}
                                        openModal={this.openModal}
                                        setImage={this.setImage}
                                        bio={this.state.biodraft}
                                        setBio={this.setBio}
                                    />
                                )}
                            />

                            <Route
                                path="/user/:id"
                                render={(props) => (
                                    <OtherProfiles
                                        id={props.match.params.id}
                                        currentUser={this.state.id}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />

                            <Route
                                path="/users"
                                render={() => <FindPeople />}
                            />
                            <Route path="/friends" component={Friends} />
                            <Route path="/chat" component={Chat} />
                        </div>
                    )}
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeModal={this.closeModal}
                    />
                )}
            </div>
        );
    }
}

{
    /* <Profile
    id={this.state.id}
    firstname={this.state.firstname}
    lastname={this.state.lastname}
    ProfilePic={this.state.ProfilePic}
    openModal={this.openModal}
    setImage={this.setImage}
    setBio={this.setBio}
    bio={this.state.biodraft}
/>; */
}
