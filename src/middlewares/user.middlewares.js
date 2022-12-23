import bcrypt from "bcrypt";
import { newUserSchema, userSchema } from "../models/user.models.js"
import { selectEmail, validateUserGet } from "../repository/user.repository.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function validateUser(req, res, next) {
    const { email } = req.body;
    const users = req.body;
    const { error } = newUserSchema.validate(users, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const Ifemail = await selectEmail(email)

    if(Ifemail.rowCount > 0){
        return res.status(409).send("Email já cadastrado!")
      }
    res.locals = users;
    next();
}

export async function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    let infoLogin;

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const Ifemail = await selectEmail(email)

    if (Ifemail.rowCount === 0 || !bcrypt.compareSync(password, Ifemail.rows[0].password) || "") {
        return res.status(401).send("E-mail ou Senha inválido.");
    }
    const passwordConfirmed = bcrypt.compareSync(password, Ifemail.rows[0].password)
    if (Ifemail.rowCount > 0 && passwordConfirmed) {
        infoLogin = {
            email: email,
            password: passwordConfirmed,
            name: Ifemail.rows[0].name,
            id: Ifemail.rows[0].id
        }
    }

    res.locals = infoLogin;

    next();
}

export async function validateHeader(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send("Token error");
    }
    const code = jwt.verify(token, process.env.JWT_SECRET);
    if (!code) {
        return res.sendStatus(401)
    }

    const userId = code.userId
    const ifUser = validateUserGet(userId)

    if (ifUser.rowCount < 1) {
        return res.sendStatus(404)
    }

    res.locals.userId = userId;

    next();
}