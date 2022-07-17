"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../controllers/TodoController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const todoRoutes = express_1.default.Router();
exports.todoRoutes = todoRoutes;
todoRoutes.get("/", AuthMiddleware_1.AuthMiddleware, TodoController_1.TodoController.getAll);
todoRoutes.post("/", AuthMiddleware_1.AuthMiddleware, TodoController_1.TodoController.create);
todoRoutes.patch("/:todoId", AuthMiddleware_1.AuthMiddleware, TodoController_1.TodoController.toggleCompleted);
todoRoutes.delete("/", AuthMiddleware_1.AuthMiddleware, TodoController_1.TodoController.deleteAll);
todoRoutes.delete("/:todoId", AuthMiddleware_1.AuthMiddleware, TodoController_1.TodoController.deleteById);
