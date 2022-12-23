import { connection } from "../database/database.js"

export function selectEmail(email) {
    return connection.query("SELECT * FROM users WHERE email=$1", [email]);
}

export function registerUser(name, email, hashedPassword) {
    return connection.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashedPassword]
    );
}

export function user(email, password) {
    return connection.query(
        "SELECT * FROM users WHERE email=$1 AND password=$2", [email, password]
    );
}

export function validateUserGet(userId) {
    return connection.query('SELECT * FROM users WHERE id=$1', [userId]);
}

export function linkGet(userId) {
    return connection.query(
        'SELECT u.id AS id, u.name AS name, l.id AS "linkId", l."shortUrl", l.url, l."visitCount" FROM links l JOIN users u ON l."userId" = u.id WHERE l."userId"=$1 GROUP BY u.id, u.name, l.id', [userId]);
}

export function visitCount(userId) {
    return connection.query('SELECT SUM(l."visitCount") AS "visitCount" FROM links l JOIN users u ON l."userId" = u.id WHERE l."userId"=$1', [userId]);
}