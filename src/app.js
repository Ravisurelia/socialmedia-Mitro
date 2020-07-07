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
    }

    //lifecycle methods
    componentDidMount() {
        // console.log("component did mount");
        //make axios req to server to get the information about the users (first, last , profile picture)
        //modify the users table to have a column for profile picture.
        axios.get("/user").then((res) => {
            //we are going to store the response we got from server in state
            //get a point where you can log this.state and see the first last and profile pic.
        });
    }

    toggleModal() {
        console.log("togglemodal works: ");
        this.setState({
            uploaderIsVisible: true,
        });
        this.toggleModal = this.toggleModal.bind(this); //this we want to use in prfilepic as it should open when you click on the profilepic
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
            <div>
                <h1>hey hey hey</h1>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    ProfilePic={this.state.ProfilePic}
                    toggleModal={this.toggleModal}
                />
                <p onClick={this.toggleModal}>click me to open the modal</p>
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}
