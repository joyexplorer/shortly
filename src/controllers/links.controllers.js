import { nanoid } from 'nanoid'
import { urlShort, getUrl } from '../repository/links.repository.js';

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

export async function urlList(req, res) {
    const { id } = req.params;

    try {
        const urlGet = await getUrl(id)
        if (urlGet.rowCount > 0) {
            const url = {
                id: urlGet.rows[0].id,
                shortUrl: urlGet.rows[0].shortUrl,
                url: urlGet.rows[0].url
            }
            return res.status(201).send(url);
        } else {
            return res.sendStatus(404)
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}