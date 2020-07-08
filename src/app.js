import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

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

        /*  this.setBio = this.setBio.bind(this); */
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
                firstname: res.data.first,
                lastname: res.data.last,
                ProfilePic: image,
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

    /*   setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    } */
    render() {
        /* console.log("this is my state: ", this.state);
        console.log("this is my first:", this.state.first);
        console.log("this is my last:", this.state.last);
        console.log("this is my ProfilePic:", this.state.ProfilePic); */

        return (
            <div className="profile_picture">
                <h3 className="image_header">
                    Please upload your profile Picture!
                </h3>

                {/*  <Profile
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    ProfilePic={this.state.ProfilePic}
                /> */}

                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    ProfilePic={this.state.ProfilePic}
                    openModal={this.openModal}
                    setImage={this.setImage}
                />

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
