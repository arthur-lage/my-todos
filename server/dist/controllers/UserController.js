"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../utils/validators");
exports.UserController = {
    async getAll(req, res) {
        try {
            const users = await User_1.default.find();
            return res.status(200).json(users);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name)
                return res.status(400).json({ message: "You must provide a name." });
            if (!email)
                return res.status(400).json({ message: "You must provide an email." });
            if (!password)
                return res
                    .status(400)
                    .json({ message: "You must provide a password." });
            if (!(0, validators_1.validateName)(name))
                return res.status(400).json({ message: "Invalid email/password" });
            if (!(0, validators_1.validateEmail)(email))
                return res.status(400).json({ message: "Invalid email/password" });
            if (!(0, validators_1.validatePassword)(password))
                return res.status(400).json({ message: "Invalid email/password" });
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = await User_1.default.create({
                name,
                email,
                password: hashedPassword,
            });
            const token = jsonwebtoken_1.default.sign({
                id: newUser._id,
            }, String(process.env.JWT_SECRET), {
                expiresIn: "2d",
            });
            return res.status(200).json({ token, message: "User created." });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email)
                return res.status(400).json({ message: "You must provide an email." });
            if (!password)
                return res
                    .status(400)
                    .json({ message: "You must provide a password." });
            if (!(0, validators_1.validateEmail)(email))
                return res.status(400).json({ message: "Invalid email/password" });
            if (!(0, validators_1.validatePassword)(password))
                return res.status(400).json({ message: "Invalid email/password" });
            const emailExists = await User_1.default.findOne({ email });
            if (!emailExists)
                return res.status(400).json({ message: "Invalid email/password." });
            const isPasswordCorrect = await bcrypt_1.default.compare(password, emailExists.password);
            if (!isPasswordCorrect)
                return res.status(400).json({ message: "Invalid email/password." });
            const token = jsonwebtoken_1.default.sign({ id: emailExists._id }, String(process.env.JWT_SECRET), {
                expiresIn: "2d",
            });
            return res.status(200).json({ token, message: "Login successful." });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async deleteAll(req, res) {
        try {
            await User_1.default.deleteMany();
            return res.status(200).json({ message: "Users deleted." });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async deleteById(req, res) {
        try {
            //@ts-ignore
            const { id } = req.user;
            await User_1.default.findByIdAndDelete(id);
            return res.status(200).json({ message: "User deleted." });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async auth(req, res) {
        try {
            //@ts-ignore
            const { id } = req.user;
            const currentUser = await User_1.default.findById(id);
            if (!currentUser)
                return res.status(401).json({ message: "Invalid user id" });
            const currentUserInfo = {
                id: currentUser?._id,
                name: currentUser?.name,
                email: currentUser?.email,
            };
            return res.status(200).json(currentUserInfo);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
};
