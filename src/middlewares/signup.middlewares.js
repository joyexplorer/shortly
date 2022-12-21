import bcrypt from "bcrypt";
import { request } from "express";
import { newUserSchema, userSchema } from "../models/signup.models.js"
import { validateEmail } from "../repository/signup.repository.js";

export async function validateUser(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const users = req.body;
    const { error } = userSchema.validate(users, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const Ifemail = await validateEmail(email)

    if (Ifemail.rowCount > 0) {
        return res.status(409).send("Este email já existe!")
    }
    res.locals = users;
    next();
}

export async function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const { error } = newUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const Ifemail = await validateEmail(email)
    const passwordConfirmed = bcrypt.compareSync(password, Ifemail.rows[0].password);

    if (Ifemail.rowCount === 0) {
        return res.sendStatus(401)
    }

    if (!passwordConfirmed) {
        return res.sendStatus(401);
    }

    res.locals = req.body;
    next();
}