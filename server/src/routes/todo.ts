import express from "express";
import { TodoController } from "../controllers/TodoController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const todoRoutes = express.Router();

todoRoutes.get("/", AuthMiddleware, TodoController.getAll);
todoRoutes.post("/", AuthMiddleware, TodoController.create);
todoRoutes.patch("/:todoId", AuthMiddleware, TodoController.toggleCompleted);
todoRoutes.delete("/", AuthMiddleware, TodoController.deleteAll);
todoRoutes.delete("/:todoId", AuthMiddleware, TodoController.deleteById);

export { todoRoutes };
