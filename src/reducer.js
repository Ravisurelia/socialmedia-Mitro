//this is one big function with a bunch of if else conditions = if action = x , change the state to this...

export default function reducer(state = { friends: [] }, action) {
    if (action.type == "RECEIVE_FRIENDS_LIST") {
        state = {
            ...state,
            friends: action.friends,
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        let newFriends = [];
        state.friends.map((each) => {
            if (action.id == each.id) {
                each.accepted = true;
            }
            newFriends.push(each);
        });
        state = {
            ...state,
            friends: newFriends,
        };
    }
    if (action.type == "UNFRIEND") {
        let newFriends = [];
        state.friends.map((each) => {
            if (action.id != each.id) {
                newFriends.push(each);
            }
        });
        state = {
            ...state,
            friends: newFriends,
        };
    }
    //state = {} means i am passing the reducer a global state
    //action- here the action is the change we wanna make which is a big object
    console.log("this is my action in friends state:", action);
    return state;
}

//---------------------------------------------------------------------
//three methods which we can use for making copies of obj and arrays-------
//---------------------------------------------------------------------

/* var obj = {
    name: "Ravi",
};
//#1. spread operator for obj and array
//creating a clone
var newObj = {
    ...obj,
};
// add new properties to clone
var newObj = {
    ...obj,
    last: "Surelia",
};

var arr = [1, 2, 3];
var newArr = [...arr];
var newArr = [...arr, 4, 5, 6]; */
//---------------------------------------------------------------------

//#2. MAP-works only with arrays not with objs
//its a loop and useful for cloning, looping, and changing each element in the array
//---------------------------------------------------------------------

//#3. FILTER - an array method
//nice method for REMOVING the things from array
//---------------------------------------------------------------------
