import { connection } from "../database/database.js"

export function urlShort(url, shortUrl, userId) {
    return connection.query(`INSERT INTO links (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3);`,
        [url, shortUrl, userId]
    );
}

export function getUrl(id){
    return connection.query("SELECT * FROM links WHERE id=$1", [id] );
}