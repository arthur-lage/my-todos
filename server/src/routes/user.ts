import express from "express";
import { UserController } from "../controllers/UserController";

import { AuthMiddleware } from '../middlewares/AuthMiddleware'

const userRoutes = express.Router();

userRoutes.get("/", UserController.getAll);
userRoutes.get("/auth", AuthMiddleware, UserController.auth);
userRoutes.post("/", UserController.create);
userRoutes.post("/login", UserController.login);
userRoutes.delete("/", AuthMiddleware, UserController.deleteAll);
userRoutes.delete("/:id", AuthMiddleware, UserController.deleteById);

export { userRoutes };
