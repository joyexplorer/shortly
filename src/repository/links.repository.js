import { connection } from "../database/database.js"

export function urlShort(url, shortUrl, userId) {
    return connection.query(`INSERT INTO links (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3);`,
        [url, shortUrl, userId]
    );
}

export function getUrls(id) {
    return connection.query("SELECT * FROM links WHERE id=$1", [id]);
}

export function getShortUrls(shortUrl) {
    return connection.query('SELECT * FROM links WHERE "shortUrl"=$1', [shortUrl]);
}

export function visitCount(id) {
    return connection.query('UPDATE links SET "visitCount"= ("visitCount" + 1) WHERE id=$1', [id]);
}

export function deleteUrl(id) {
    return connection.query('DELETE FROM links WHERE id=$1', [id]);
}