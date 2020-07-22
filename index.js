const express = require("express");
const app = express();
//======socket boilerplate=================================//
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080",
});
//======socket boilerplate=================================//

const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const {
    addingUsers,
    gettingPassword,
    insertingCode,
    checkingCode,
    updatingPassword,
    gettingUser,
    updatingImage,
    updatingBio,
    getting3Users,
    gettingMatchingProfiles,
    getInitialStatus,
    sendingFriendsRequest,
    updatingFriendsRequest,
    cancelFriendsRequest,
    gettingFriendsList,
    getLastTenMessages,
    insertNewMessage,
    getMessageInformation,
    deleteAccount,
} = require("./db.js");

//==============================middleware=====================================================================//

app.use(compression());
app.use(express.static(__dirname + "/public"));

//======cookie session middleware=================================//

/* app.use(
    cookieSession({
        secret: `Ì am always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14, //to set the cookies-how long we want cookie to last
    })
); */

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
//======cookie session middleware=================================//

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

//-----------------------------------------------------
//-------FILE UPLOAD BOILERPLATE-----------------------
//-----------------------------------------------------
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
//-----------------------------------------------------
//-------FILE UPLOAD BOILERPLATE-----------------------
//-----------------------------------------------------

/* app.use(csurf());

app.use((req, res, next) => {
    res.setHeader("x-frame-option", "deny");
    res.locals.csrfToken = req.csrfToken(); //////for csurf
    next();
}); */

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//==============================middleware=====================================================================//

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/registration", (req, res) => {
    if (
        req.body.firstname != "" &&
        req.body.lastname != "" &&
        req.body.email != "" &&
        req.body.password != ""
    ) {
        hash(req.body.password)
            .then((hashedPass) => {
                console.log("my hashedPass: ", hashedPass);
                addingUsers(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hashedPass
                )
                    .then((results) => {
                        console.log("req body: ", req.body);
                        console.log(
                            "my register POST results in index: ",
                            results
                        );
                        console.log("req.session: ", req.session);
                        req.session.userId = results.rows[0].id;
                        req.session.permission = true;
                        console.log(
                            "req.session after the value set: ",
                            req.session
                        );
                        res.json();
                    })
                    .catch((err) => {
                        console.log("my post register error: ", err);
                        res.json();
                    });
            })
            .catch((err) => {
                console.log("my post register error2: ", err);
            });
    } else {
        res.json(err);
    }
});

app.get("/login", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/registration");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    console.log("this is my req.body in post login: ", req.body);
    console.log("this is my req.session in post login: ", req.session.userId);
    //here we are getting the password from the register page and matching it here to see if it is the same
    gettingPassword(req.body.email)
        .then((results) => {
            /*  console.log("my login results: ", results);
            console.log("req.body.email in login : ", req.body.email);
            console.log("this is my 0 pass: ", results.rows[0].password);
            console.log("req.body.password in login: ", req.body.password); */
            compare(req.body.password, results.rows[0].password)
                .then((match) => {
                    if (match) {
                        req.session.userId = results.rows[0].id;

                        if (!results.rows[0]) {
                            res.json();
                        } else {
                            res.json("Login Successful");
                        }
                        /* signedUserId(req.session.userId)
                            .then((results) => {
                                console.log("my login results 2: ", results);
                                if (!results.rows[0]) {
                                    res.redirect("/petition");
                                } else {
                                    res.redirect("/thankyou");
                                }
                            })
                            .catch((err) => {
                                console.log(
                                    "my post register signedUserId error: ",
                                    err
                                );
                                res.redirect("/petition");
                            }); */
                    } else {
                        console.log("it is not equal: ", match);
                        res.json();
                    }
                })
                .catch((err) => {
                    console.log("my post login error: ", err);
                    res.json();
                });
        })
        .catch((err) => {
            console.log("my post login error 2: ", err);
            res.json();
        });

    //res.end();
});

app.post("/password/reset/start", (req, res) => {
    gettingPassword(req.body.email)
        .then((results) => {
            if (results.rows[0]) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                insertingCode(req.body.email, secretCode)
                    .then(() => {
                        sendEmail(
                            req.body.email,
                            "Email for resetting your password.",
                            `Here is the secret code that will allow you to reset your password: ${secretCode}`
                        );
                        res.json();
                    })
                    .catch((err) => {
                        console.log("NO SUCH CODE: ", err);
                    });
            } else {
                res.sendStatus(500);
            }
        })
        .catch((err) => {
            console.log("NOTHING FOUND: ", err);
        });
});

app.post("/password/reset/verify", (req, res) => {
    checkingCode(req.body.email)
        .then((results) => {
            /*  console.log(
                "my login results in /password/reset/verify: ",
                results
            );
            console.log(
                "req.body.email in /password/reset/verify:",
                req.body.email
            ); */
            console.log("my body.code ", req.body.code);
            console.log("this is my 0 row: ", results.rows[0]);

            if (results.rows[0]) {
                hash(req.body.password)
                    .then((hashedPassword) => {
                        console.log("my hashedPass: ", hashedPassword);
                        updatingPassword(req.body.email, hashedPassword)
                            .then(() => {
                                console.log(
                                    "req.body in /password/reset/verify  : ",
                                    req.body
                                );
                                res.json();
                            })
                            .catch((err) => {
                                console.log("NO UPDATE: ", err);
                            });
                    })
                    .catch((err) => {
                        console.log("NO HASHING: ", err);
                    });
            } else {
                console.log("NOTHING HAPPENED IN WHOLE HASHING");
            }
        })
        .catch((err) => {
            console.log("NOTHING HAPPENED IN CHECKING CODE: ", err);
        });
});

app.get("/user", (req, res) => {
    gettingUser(req.session.userId)
        .then((results) => {
            console.log("my result in index.js get users: ", results);
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("NOTHING HAPPENED IN GETTING USER: ", err);
        });
});
app.get("/api/user/:id", (req, res) => {
    if (req.session.userId == req.params.id) {
        res.json({ match: true });
    }
    gettingUser(req.params.id)
        .then((results) => {
            console.log("my result in index.js get users id: ", results);
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("NOTHING HAPPENED IN GETTING USER ID: ", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("file: ", req.file); //file we just uploaded
    console.log("input: ", req.body); //rest of the input field first, last
    const { filename } = req.file;
    const imageUrl = `${s3Url}${filename}`;

    if (req.file) {
        //you will do db insert here all the info
        updatingImage(req.session.userId, imageUrl)
            .then(({ rows }) => {
                res.json(rows[0]);
            })
            .catch((err) => {
                console.log("This is my uploadImage err: ", err);
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/bioeditor", (req, res) => {
    updatingBio(req.session.userId, req.body.bio)
        .then((results) => {
            console.log("my result in index.js post bioeditor: ", results);
            if (results.rows[0]) {
                res.json(results.rows[0]);
            } else {
                res.sendStatus(404);
                console.log("this is my 404 error in bio editor");
            }
        })
        .catch((err) => {
            console.log("This is my bioedit err: ", err);
        });
});

app.get("/latestusers", (req, res) => {
    getting3Users()
        .then((results) => {
            console.log(
                "my result in index.js in get getting3users: ",
                results
            );
            res.json(results);
        })
        .catch((err) => {
            console.log("This is my get3users err: ", err);
        });
});

app.get("/api/gettingMatchingProfiles", (req, res) => {
    let val = req.query.searchName;
    console.log("query is ", req.query.searchName);
    gettingMatchingProfiles(val)
        .then((results) => {
            console.log(
                "my result in index.js in get gettingmatchingprofiles: ",
                results
            );
            res.json(results.rows);
            console.log("my results.rows: ", results.rows);
        })
        .catch((err) => {
            console.log("This is my gettingmatchingprofiles err: ", err);
        });
});

app.get("/get-initial-status/:id", (req, res) => {
    getInitialStatus(req.session.userId, req.params.id)
        .then((results) => {
            console.log(
                "my result in index.js in get getInitialstatus: ",
                results
            );
            if (results.rows[0]) {
                if (results.rows[0].accepted) {
                    res.json({ Friendship: true });
                } else {
                    if (req.session.userId === results.rows[0].receiver_id) {
                        res.json({ Accepted: true });
                    } else {
                        res.json({ Pending: true });
                    }
                }
            } else {
                res.json({ Friendship: false });
            }
        })
        .catch((err) => {
            console.log("This is get getInitialstatus err in index.js: ", err);
        });
});

app.post("/make-friend-request/:id", (req, res) => {
    sendingFriendsRequest(req.session.userId, req.params.id)
        .then((results) => {
            console.log(
                "my result in index.js in post sendingFriendsRequest: ",
                results
            );
            res.json({ Pending: true });
        })
        .catch((err) => {
            console.log(
                "This is post sendingFriendsRequest err in index.js: ",
                err
            );
        });
});

app.post("/accept-friend-request/:id", (req, res) => {
    updatingFriendsRequest(req.session.userId, req.params.id)
        .then((results) => {
            console.log(
                "my result in index.js in post updatingFriendsRequest: ",
                results
            );
            res.json({ Friendship: true });
        })
        .catch((err) => {
            console.log(
                "This is post updatingFriendsRequest err in index.js: ",
                err
            );
        });
});

app.post("/end-friendship/:id", (req, res) => {
    cancelFriendsRequest(req.session.userId, req.params.id)
        .then((results) => {
            console.log(
                "my result in index.js in post cancelFriendsRequest: ",
                results
            );
            res.json({ Friendship: false });
        })
        .catch((err) => {
            console.log(
                "This is post cancelFriendsRequest err in index.js: ",
                err
            );
        });
});

app.get("/friendsList", (req, res) => {
    gettingFriendsList(req.session.userId)
        .then((results) => {
            console.log(
                "my result in index.js in get friends-wannabes: ",
                results
            );
            res.json(results.rows);
        })
        .catch((err) => {
            console.log("This is get friends-wannabes err in index.js: ", err);
        });
});

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});

app.post("/deleteAccount", (req, res) => {
    console.log("hit delete acc");
    deleteAccount(req.session.userId).then(() => {
        req.session.userId = null;
        res.json({ success: true });
    });
});
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", function (socket) {
    //all of our socket code has to go inside here
    //do not write anything outside or it will not work
    console.log(`Socket id ${socket.id} is now connected`);

    //we only want to do socket when user is logged in
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    //if user is at this point after they are successfully logged in
    const userId = socket.request.session.userId;

    //this is the perfect place to get the last 10 messages from the chat

    getLastTenMessages().then((results) => {
        console.log("my results in socket.io: ", results.rows);
        io.sockets.emit("chatMessages", results.rows.reverse());
        console.log("last 10 messages : ", results.rows);
    });

    socket.on("My amazing chat message", (newMessage) => {
        console.log("this is coming from chat.js:", newMessage);
        console.log("user who sent newMessage is :", userId);

        insertNewMessage(userId, newMessage).then((results) => {
            console.log("Messages sent to chatBox ", results.rows[0]);
            getMessageInformation(userId).then((results) => {
                console.log("SENDER: ", results.rows[0]);
                io.sockets.emit("chatMessage", results.rows[0]);
            });
        });
    });
});
