import { urlSchema } from "../models/links.models.js";
import { getUrls } from "../repository/links.repository.js"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function validateLinks(req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    let sessionData;

    try {
        if (!token) {
            return res.status(401).send("Token error");
        }

        const { error } = urlSchema.validate({ url }, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const code = jwt.verify(token, process.env.JWT_SECRET);
        sessionData = {
            url: url,
            userId: code.userId,
        }

    } catch (error) {
        return res.sendStatus(401);
    }
    res.locals = sessionData;
    next();
}

export async function validateUrl(req, res, next) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {
        const getUrl = await getUrls(id);
        const code = jwt.verify(token, process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).send("Token error");
        }

        if (getUrl.rowCount < 1) {
            return res.sendStatus(404)
        }

        if (getUrl.rows[0].userId !== code.userId) {
            return res.sendStatus(401)
        }
    } catch (error) {
        return res.status(401).send({ message: "Token inválido" });
    }

    res.locals = id;

    next();
}

