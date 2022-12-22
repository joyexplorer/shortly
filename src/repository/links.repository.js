import { connection } from "../database/database.js"

export function sessionsToken(token) {
    return connection.query("SELECT * FROM sessions WHERE token=$1", [token]);
}

export function urlShort(url, shortUrl, userId) {
    return connection.query(`INSERT INTO links (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3);`,
        [url, shortUrl, userId]
    );
}