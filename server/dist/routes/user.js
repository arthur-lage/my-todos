"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const userRoutes = express_1.default.Router();
exports.userRoutes = userRoutes;
userRoutes.get("/", UserController_1.UserController.getAll);
userRoutes.get("/auth", AuthMiddleware_1.AuthMiddleware, UserController_1.UserController.auth);
userRoutes.post("/", UserController_1.UserController.create);
userRoutes.post("/login", UserController_1.UserController.login);
userRoutes.delete("/", AuthMiddleware_1.AuthMiddleware, UserController_1.UserController.deleteAll);
userRoutes.delete("/:id", AuthMiddleware_1.AuthMiddleware, UserController_1.UserController.deleteById);
