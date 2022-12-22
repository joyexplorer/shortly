import { urlSchema } from "../models/links.models.js";
import { sessionsToken } from "../repository/links.repository.js";

export async function validateLinks(req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { error } = urlSchema.validate({ url }, { abortEarly: false });

    if (!token) {
        return res.status(401).send("Token error");
    }

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const sessions = await sessionsToken(token);
    if (sessions.rowCount < 1) {
        return res.status(401).send("Invalid token");
    }

    const sessionData = {
        url: url,
        userId: sessions.rows[0].userId
    }

    res.locals = sessionData;

    next();
}