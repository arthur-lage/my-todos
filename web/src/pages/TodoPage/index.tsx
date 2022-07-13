import { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import { toast } from "react-toastify";

type Todo = {
  _id: string;
  text: string;
  completed: boolean;
};

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoText, setTodoText] = useState("");
  const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);

  const { handleLogout } = useAuth();

  async function fetchTodos() {
    try {
      const userTodos = await api.get<Todo[]>("/todos");

      //@ts-ignore
      setTodos(userTodos.data.todos);
    } catch (err) {
      console.log(err);
    }
  }

  async function submitNewTodo(e: FormEvent) {
    e.preventDefault();

    try {
      setTodoText("");

      const res = await api.post("/todos", {
        text: todoText,
      });

      const newTodoInfo = res.data.createdTodoInfo;

      setCreatedTodo(newTodoInfo);
    } catch (err) {
      console.log(err);
      //@ts-ignore
      toast.error(err.response.data.message, toastOptions);
    }
  }

  async function deleteAllTodos() {
    try {
      await api.delete("/todos");

      setTodos(null);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTodoById(id: string) {
    try {
      await api.delete("/todos/" + id);

      if (todos) {
        const newTodoList = todos.filter((todo) => todo._id !== id);
        setTodos(newTodoList);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleCompleted(id: string) {
    try {
      const res = await api.patch("/todos/" + id);

      if (todos) {
        const newTodoList = todos.map((todo) => {
          if (todo._id == id) {
            todo.completed = res.data.newCompletedProperty;
          }

          return todo;
        });

        setTodos(newTodoList);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    //@ts-ignore
    createdTodo && setTodos((prev) => [...prev, createdTodo]);
  }, [createdTodo]);

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={handleLogout}>Log out</button>

      <form>
        <div className="input-field">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="submit" onClick={submitNewTodo}>
            +
          </button>
        </div>
      </form>

      <section className="todos">
        <button onClick={deleteAllTodos}>Clear all todos</button>
        {todos !== null && todos.length > 0 ? (
          <>
            {todos.map((todo) => (
              <div key={todo._id}>
                <span
                  style={{
                    textDecoration: `${todo.completed ? "line-through" : ""}`,
                  }}
                >
                  {todo.text}
                </span>
                <button
                  className="complete"
                  onClick={() => toggleCompleted(todo._id)}
                >
                  ✔
                </button>
                <button
                  className="delete"
                  onClick={() => deleteTodoById(todo._id)}
                >
                  X
                </button>
              </div>
            ))}
          </>
        ) : (
          <h2>You have no todos yet!</h2>
        )}
      </section>

      <ToastContainer />
    </div>
  );
}
