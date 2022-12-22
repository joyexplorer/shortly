import bcrypt from "bcrypt";
import { newUserSchema, userSchema } from "../models/user.models.js"
import { validateEmail } from "../repository/user.repository.js";

export async function validateUser(req, res, next) {
    const { email } = req.body;
    const users = req.body;
    const { error } = newUserSchema.validate(users, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const Ifemail = await validateEmail(email)

    if (Ifemail) {
        return res.status(409).send("Este email já existe!")
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

    const Ifemail = await validateEmail(email)
    const passwordConfirmed = bcrypt.compareSync(password, Ifemail.rows[0].password);

    if (!passwordConfirmed || "") {
        return res.status(401).send("E-mail ou Senha inválido.");
    }

    if(Ifemail.rowCount > 0 && passwordConfirmed){
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