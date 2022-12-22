import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { registerUser, user, validateUserGet, linkGet, visitCount } from "../repository/user.repository.js";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(req, res) {
    const { name, email, password } = res.locals;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await registerUser(name, email, hashedPassword)
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password, name, id } = res.locals;

    const payload = {
        username: name,
        userId: id
    }

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)

    try {
        await user(email, password)
        return res.status(201).send(jwtToken);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getLinks(req, res) {
    const userId = res.locals

    try {
        const visit = await visitCount(userId)
        const visited = visit.rows
        const links = await linkGet(userId)
        const dataLink = links.rows

        const response = {
            id: dataLink[0].id,
            name: dataLink[0].name,
            visitCount: visited[0].visitCount,
            shortenedUrls: dataLink.map((row) => ({
                id: row.linkId,
                shortUrl: row.shortUrl,
                url: row.url,
                visitCount: row.visitCount,
            })),
        };

        return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}