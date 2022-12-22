import joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = joi.extend(joiPasswordExtendCore);

export const newUserSchema = joi.object({
    name: joi.string().trim().label("Name").required(),
    email: joi.string().email().trim().label("Email").required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(2)
      .minOfUppercase(2)
      .minOfNumeric(2)
      .label("Password")
      .required()
      .messages({"password.minOfUppercase": "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters": "{#label} should contain at least {#min} special character",
      "password.minOfLowercase": "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric": "{#label} should contain at least {#min} numeric character",
    }),
  confirmPassword: joi
    .any()
    .valid(joi.ref("password"))
    .label("Password Confirmation")
    .required()
    .messages({ "any.only": '"Password" and "Password Confirmation" must be equal.' }),
});

export const userSchema = joi.object({
    email: joi.string().email().trim().label("Email").required(),
    password: joi.string().label("Password").required(),
});

