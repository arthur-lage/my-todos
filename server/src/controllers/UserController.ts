import { Request, Response } from "express";

import User from "../models/User";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";

export const UserController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.status(200).json(users);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async create(req: Request, res: Response) {
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

      if (!validateName(name))
        return res.status(400).json({ message: "Invalid email/password" });
      if (!validateEmail(email))
        return res.status(400).json({ message: "Invalid email/password" });
      if (!validatePassword(password))
        return res.status(400).json({ message: "Invalid email/password" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          id: newUser._id,
        },
        String(process.env.JWT_SECRET),
        {
          expiresIn: "2d",
        }
      );

      return res.status(200).json({ token, message: "User created." });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email)
        return res.status(400).json({ message: "You must provide an email." });
      if (!password)
        return res
          .status(400)
          .json({ message: "You must provide a password." });

      if (!validateEmail(email))
        return res.status(400).json({ message: "Invalid email/password" });
      if (!validatePassword(password))
        return res.status(400).json({ message: "Invalid email/password" });

      const emailExists = await User.findOne({ email });

      if (!emailExists)
        return res.status(400).json({ message: "Invalid email/password." });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        emailExists.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid email/password." });

      const token = jwt.sign(
        { id: emailExists._id },
        String(process.env.JWT_SECRET),
        {
          expiresIn: "2d",
        }
      );

      return res.status(200).json({ token, message: "Login successful." });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      await User.deleteMany();

      return res.status(200).json({ message: "Users deleted." });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user!;

      await User.findByIdAndDelete(id);

      return res.status(200).json({ message: "User deleted." });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async auth(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user!;

      const currentUser = await User.findById(id);

      if (!currentUser)
        return res.status(401).json({ message: "Invalid user id" });

      const currentUserInfo = {
        id: currentUser?._id,
        name: currentUser?.name,
        email: currentUser?.email,
      };

      return res.status(200).json(currentUserInfo);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
