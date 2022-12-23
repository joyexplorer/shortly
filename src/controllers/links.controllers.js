import { nanoid } from 'nanoid'
import { urlShort, getUrls, visitCount, getShortUrls, deleteUrl } from '../repository/links.repository.js';

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
        const urlGet = await getUrls(id)
        if (urlGet.rowCount > 0) {
            const url = {
                id: urlGet.rows[0].id,
                shortUrl: urlGet.rows[0].shortUrl,
                url: urlGet.rows[0].url
            }
            return res.status(200).send(url);
        } else {
            return res.sendStatus(404)
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const findUrl = await getShortUrls(shortUrl)

        if (findUrl.rowCount > 0) {
            const url = `localhost:4000/${findUrl.rows[0].shortUrl} `
            const id = findUrl.rows[0].id
            await visitCount(id)
            return res.redirect(url);
        } else {
            return res.sendStatus(404)
        }

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteUrls(req, res) {
    const id = res.locals

    try {
        await deleteUrl(id)
        return res.sendStatus(204)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}