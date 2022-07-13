import { Request, Response } from "express";
import Todo from "../models/Todo";

export const TodoController = {
  async getAll(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user!;

      const todos = await Todo.find({
        userId: id,
      });

      return res.status(200).json({ todos });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { text } = req.body;
      //@ts-ignore
      const { id } = req.user!;

      const newTodo = {
        text,
        completed: false,
        userId: id,
      };

      const createdTodo = await Todo.create(newTodo);

      const createdTodoInfo = {
        id: createdTodo._id,
        text: createdTodo.text,
        completed: createdTodo.completed,
        userId: createdTodo.userId,
      };

      return res
        .status(200)
        .json({ createdTodoInfo, message: "Todo created successfully" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async toggleCompleted(req: Request, res: Response) {
    try {
      const { todoId } = req.params;
      //@ts-ignore
      const { id } = req.user!;

      const currentTodo = await Todo.findById(todoId);

      const newCompletedProperty = currentTodo?.completed ? false : true;

      await Todo.updateOne(
        {
          id: todoId,
          userId: id,
        },
        {
          completed: newCompletedProperty,
        }
      );

      return res.status(200).json({ newCompletedProperty, message: "Ok" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user!;

      await Todo.deleteMany({
        userId: id,
      });

      return res.status(200).json({ message: "Todos deleted successfully." });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user!;
      const { todoId } = req.params;

      await Todo.deleteOne({
        _id: todoId,
        userId: id,
      });

      return res.status(200).json({ message: "Todo deleted successfully." });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
