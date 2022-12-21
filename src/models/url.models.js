import joi from "joi";

export const urlSchema = joi.object({
    url: joi.string().uri().trim().required(),
});

export default urlSchema;