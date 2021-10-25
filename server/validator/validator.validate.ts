import { NextFunction, Request, Response } from "express";

export default {
    schema: (schema:any) =>
        (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.body);

            if (!error) {
                next();
            } else {
                const { details } = error;
                console.log(error.context)
                const message = details.map((i:any) => i.message).join(',');
                res.status(422).json({ error: message })
            }
        }
}