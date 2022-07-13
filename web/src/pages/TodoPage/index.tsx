import { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import { toast } from "react-toastify";
import { Plus, SignOut } from "phosphor-react";

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
    <div className="animation-fade ">
      <header className="border-b-zinc-100 border-[1px] header-shadow flex items-center justify-between px-8 py-4">
        <h1 className="font-bold text-zinc-800 text-[2.4rem] tracking-wider">
          my_todos
        </h1>
        <button
          className="font-medium text-2xl text-zinc-900 flex items-center gap-4 cursor-pointer hover:brightness-[.85] transition-all duration-150 p-3 rounded-md bg-white"
          onClick={handleLogout}
        >
          <SignOut weight="bold" color="#222" size={26} />
          Log out
        </button>
      </header>

      <main className="mt-16 flex items-center justify-between w-[80vw]">
        <form className="w-full flex items-center justify-center">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="p-3 border-[1px] text-2xl w-[60rem] rounded-md border-zinc-700"
              value={todoText}
              placeholder="Type your new todo..."
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button
              className="hover:brightness-90 bg-white transition-all duration-150 p-1 border-[1px] border-zinc-900 rounded-md"
              type="submit"
              onClick={submitNewTodo}
            >
              <Plus weight="bold" size={24} color="#222" />
            </button>
          </div>
        </form>

        <button
          className="font-medium hover:brightness-90 bg-white transition-all duration-150 p-3 border-[1px] border-zinc-900 rounded-xl w-[15rem]"
          onClick={deleteAllTodos}
        >
          Clear all todos
        </button>
      </main>

      <section className="todos">
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
