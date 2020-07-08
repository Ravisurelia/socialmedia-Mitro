import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

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
    }

    //lifecycle methods
    componentDidMount() {
        // console.log("component did mount");
        //make axios req to server to get the information about the users (first, last , profile picture)
        //modify the users table to have a column for profile picture.
        //we are going to store the response we got from server in state
        //get a point where you can log this.state and see the first last and profile pic.
        axios.get("/user").then((res) => {
            console.log("getting my res from get users: ", res);
            if (res.data.ProfilePic === undefined) {
                res.data.ProfilePic = "/default_image.png";
            }
            this.setState({
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                ProfilePic: res.data.ProfilePic,
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
    render() {
        console.log("this is my state: ", this.state);
        console.log("this is my first:", this.state.first);
        console.log("this is my last:", this.state.last);
        console.log("this is my ProfilePic:", this.state.ProfilePic);

        return (
            <div className="profile_picture">
                <h1>hey hey hey</h1>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
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
