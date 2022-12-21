import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { registerUser, user } from "../repository/signup.repository.js"

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
     const { email, password } = req.body;
     const token = uuid();

     try {
         await user(email, password)
         return res.status(201).send(token);
     } catch (err) {
         return res.status(500).send(err.message);
     }
 }