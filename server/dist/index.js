"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const user_1 = require("./routes/user");
const todo_1 = require("./routes/todo");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const dbConnectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0ktpm.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.connect(dbConnectionUrl, {
    //@ts-ignore
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", user_1.userRoutes);
app.use("/api/todos", todo_1.todoRoutes);
app.listen(PORT, () => {
    console.log("Running server on port: " + PORT);
});
