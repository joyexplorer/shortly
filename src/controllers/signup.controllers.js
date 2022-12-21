import bcrypt from "bcrypt";
import { registerUser } from "../repository/signup.repository.js"

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