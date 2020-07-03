const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const { addingUsers } = require("./db.js");

//==============================middleware=====================================================================//

app.use(compression());

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

app.use(csurf());

app.use((req, res, next) => {
    res.setHeader("x-frame-option", "deny");
    res.locals.csrfToken = req.csrfToken(); //////for csurf
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

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
