import { connection } from "../database/database.js"

export function validateEmail(email) {
    return connection.query("SELECT * FROM users WHERE email=$1", [email]);
}

export function registerUser(name, email, hashedPassword) {
    return connection.query(
        `INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`, [name, email, hashedPassword]
    );
}

export function user(email, password) {
    return connection.query(
        "SELECT * FROM users WHERE email=$1 AND password=$2", [email, password]
    );
}
