"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ message: "A token is required." });
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
        return res.status(401).json({ message: "Token is required." });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
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
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token." });
    }
};
exports.AuthMiddleware = AuthMiddleware;
