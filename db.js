const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets.json");
    //console.log(dbUser, dbPass);
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);
}

exports.addingUsers = (firstname, lastname, email, password) => {
    //inserting user data first, last, email, password
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstname, lastname, email, password]
    );
};

exports.gettingPassword = (email) => {
    //password and id to email
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};

exports.insertingCode = (email, code) => {
    return db.query(`INSERT INTO reset_codes (email, code) VALUES ($1, $2)`, [
        email,
        code,
    ]);
};

exports.checkingCode = (email) => {
    return db.query(
        `
    SELECT * FROM reset_codes
    WHERE email=$1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    `,
        [email]
    );
};

exports.updatingPassword = (email, password) => {
    return db.query(
        `
    UPDATE users SET password=$2
    WHERE email=$1
    `,
        [email, password]
    );
};
