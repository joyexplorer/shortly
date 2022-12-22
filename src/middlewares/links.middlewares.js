import { urlSchema } from "../models/links.models.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function validateLinks(req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { error } = urlSchema.validate({ url }, { abortEarly: false });
    const secret = process.env.JWT_SECRET

    if (!token) {
        return res.status(401).send("Token error");
    }

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const code = jwt.verify(token, secret);
    if (!code) {
        return res.status(401).send("Invalid token");
    }

    const sessionData = {
        url: url,
        userId: decoded.userId
    }

    res.locals = sessionData;

    next();
}