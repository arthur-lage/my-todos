import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "A token is required." });

  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Token is required." });
  }

  try {
    const decode = jwt.verify(token, String(process.env.JWT_SECRET));

    const user = {
      // @ts-ignore
      id: decode.id,
      // @ts-ignore
      iat: decode.iat,
      // @ts-ignore
      exp: decode.exp,
    };

    //@ts-ignore
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token." });
  }
};
