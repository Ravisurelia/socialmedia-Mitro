const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const {
    addingUsers,
    gettingPassword,
    insertingCode,
    checkingCode,
    updatingPassword,
} = require("./db.js");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

//==============================middleware=====================================================================//

app.use(compression());
app.use(express.static(__dirname + "/public"));

app.use(
    cookieSession({
        secret: `Ì am always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14, //to set the cookies-how long we want cookie to last
    })
);

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

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
