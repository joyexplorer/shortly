import joi from "joi";

export const newUserSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
})

export const userSchema = joi.object({
    email: joi.string().email().trim().label("Email").required(),
    password: joi.string().label("Password").required(),
});

