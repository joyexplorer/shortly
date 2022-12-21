import { usersSchema } from "../models/signup.models.js";
import { validateEmail } from "../repository/signup.repository.js";

export async function validateUser(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const users = req.body;
    const { error } = usersSchema.validate(users, { abortEarly: false });

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