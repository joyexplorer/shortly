import { nanoid } from 'nanoid'
import { urlShort } from '../repository/links.repository.js';

export async function urlShorten(req, res) {
    const { url, userId } = res.locals;
    const shortUrl = nanoid(8);

    try {
        await urlShort(url, shortUrl, userId)
        return res.status(201).send(shortUrl);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}