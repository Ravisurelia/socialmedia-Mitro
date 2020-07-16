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

exports.gettingUser = (id) => {
    return db.query(
        `
        SELECT * FROM users
        WHERE id=$1
        `,
        [id]
    );
};

exports.updatingImage = (id, imgUrl) => {
    return db.query(
        `
        UPDATE users 
        SET imgUrl=$2
        WHERE id=$1
        RETURNING imgUrl
        `,
        [id, imgUrl]
    );
};

exports.updatingBio = (id, bio) => {
    return db.query(
        `
        UPDATE users 
        SET bio=$2
        WHERE id=$1
        RETURNING bio
        `,
        [id, bio]
    );
};
//////////2 queries for part 7
exports.getting3Users = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

exports.gettingMatchingProfiles = (val) => {
    return db.query(
        `SELECT * FROM users WHERE first ILIKE $1 or last ILIKE $1;`,
        [val + "%"]
    );
};

//////////4 queries for part 8
exports.getInitialStatus = (myId, otherId) => {
    return db.query(
        `
    SELECT * FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1)
    `,
        [myId, otherId]
    );
};

exports.sendingFriendsRequest = (myId, otherId) => {
    return db.query(
        `
    INSERT INTO friendships
    (sender_id, receiver_id) VALUES ($1, $2)
    RETURNING *
    `,
        [myId, otherId]
    );
};

exports.updatingFriendsRequest = (myId, otherId) => {
    return db.query(
        `UPDATE friendships SET accepted=true WHERE receiver_id=$1 AND sender_id=$2 RETURNING *`,
        [myId, otherId]
    );
};

exports.cancelFriendsRequest = (myId, otherId) => {
    return db.query(
        `DELETE FROM friendships 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);
        `,
        [myId, otherId]
    );
};

exports.gettingFriendsList = (myId) => {
    return db.query(
        `SELECT users.id, first, last, imgurl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id) 
    `,
        [myId]
    );
};
