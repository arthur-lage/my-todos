"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
exports.TodoController = {
    async getAll(req, res) {
        try {
            //@ts-ignore
            const { id } = req.user;
            const todos = await Todo_1.default.find({
                userId: id,
            });
            return res.status(200).json({ todos });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async create(req, res) {
        try {
            const { text } = req.body;
            //@ts-ignore
            const { id } = req.user;
            const newTodo = {
                text,
                completed: false,
                userId: id,
            };
            await Todo_1.default.create(newTodo);
            const todos = await Todo_1.default.find({
                userId: id,
            });
            return res
                .status(200)
                .json({ todos, message: "Todo created successfully" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async toggleCompleted(req, res) {
        try {
            const { todoId } = req.params;
            //@ts-ignore
            const { id } = req.user;
            const currentTodo = await Todo_1.default.findById(todoId);
            const newCompletedProperty = currentTodo?.completed ? false : true;
            await Todo_1.default.findByIdAndUpdate(todoId, {
                completed: newCompletedProperty,
            });
            const todos = await Todo_1.default.find({
                userId: id,
            });
            return res.status(200).json({ todos, message: "Ok" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    async deleteAll(req, res) {
        try {
            //@ts-ignore
            const { id } = req.user;
            await Todo_1.default.deleteMany({
                userId: id,
            });
            return res.status(200).json({ message: "Todos deleted successfully." });
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
            const { todoId } = req.params;
            await Todo_1.default.deleteOne({
                _id: todoId,
                userId: id,
            });
            return res.status(200).json({ message: "Todo deleted successfully." });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
};
