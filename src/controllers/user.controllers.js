import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { registerUser, user } from "../repository/user.repository.js";
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
    const secret = process.env.JWT_SECRET

    const payload = {
        username: name,
        userId: id
    }

    const jwtToken = jwt.sign(payload, secret)

    try {
        await user(email, password)
        return res.status(201).send(jwtToken);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}