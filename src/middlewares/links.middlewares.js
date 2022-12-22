import { urlSchema } from "../models/links.models.js";
import { tokenGet, tokenJoin, getUrls } from "../repository/links.repository.js"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function validateLinks(req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { error } = urlSchema.validate({ url }, { abortEarly: false });

    console.log(req.body)

    if (!token) {
        return res.status(401).send("Token error");
    }

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const code = jwt.verify(token, process.env.JWT_SECRET);
    if (!code) {
        return res.status(401).send("Invalid token");
    }

    const sessionToken = await tokenGet(token);
    if (sessionToken.rowCount < 1) {
        return res.sendStatus(401);
    }

    const sessionData = {
        url: url,
        userId: code.userId
    }

    res.locals = sessionData;

    next();
}

export async function validateUrl(req, res, next) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send("Token error");
    }
    const getUrl = await getUrls(id)
    if (getUrl.rowCount < 1) {
        return res.sendStatus(404)
    }
    const url = await tokenJoin(token, id);
    if (url.rowCount < 1) {
        return res.sendStatus(401)
    }

    res.locals = id;

    next();
}