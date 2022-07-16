import { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import { toast } from "react-toastify";
import { Plus, SignOut } from "phosphor-react";
import { Todo } from "../../components/Todo";

type Todo = {
  _id: string;
  text: string;
  completed: boolean;
};

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoText, setTodoText] = useState("");

  const { handleLogout } = useAuth();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

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

    if (todoText.length == 0) return;

    try {
      setTodoText("");

      const res = await api.post("/todos", {
        text: todoText,
      });

      const newTodoList = res.data.todos;

      setTodos(newTodoList);
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

  async function toggleCompleted(_id: string) {
    try {
      const res = await api.patch("/todos/" + _id);

      const newTodoList = res.data.todos;

      setTodos(newTodoList);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="animation-fade">
      <header className="border-b-zinc-100 border-[1px] header-shadow flex items-center justify-between px-8 py-4">
        <h1 className="small:text-[2rem] font-bold text-zinc-800 text-[2.4rem] tracking-wider">
          my_todos
        </h1>
        <button
          className="font-medium small:text-xl text-2xl text-zinc-900 flex items-center gap-4 cursor-pointer hover:brightness-[.85] transition-all duration-150 p-3 rounded-md bg-white"
          onClick={handleLogout}
        >
          <SignOut weight="bold" color="#222" size={26} />
          Log out
        </button>
      </header>

      <form className="mt-20 mxl:flex-col mxl:gap-8 w-[70vw] mx-auto flex items-center justify-between self-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="p-3 border-[1px] text-2xl w-[60rem] rounded-md border-blue-600"
            value={todoText}
            placeholder="Type your new todo..."
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button
            className="hover:brightness-90 bg-blue-600 transition-all duration-150 p-2 rounded-md"
            type="submit"
            onClick={submitNewTodo}
          >
            <Plus weight="bold" size={24} color="#fff" />
          </button>
        </div>

        <button
          type="button"
          className="font-medium hover:brightness-125 text-white bg-blue-600 transition-all duration-150 p-4 rounded-xl w-[15rem]"
          onClick={deleteAllTodos}
        >
          Clear all todos
        </button>
      </form>

      <section className="flex w-full justify-center mt-16 p-2">
        {todos !== null && todos.length > 0 ? (
          <div className="border-[1px] shadow-lg border-blue-600 py-4 rounded-md overflow-x-hidden w-[65vw] px-4 max-h-[35rem] scrollbar scrollbar-thin scrollbar-thumb-blue-600  overflow-y-scroll flex flex-col gap-5">
            {todos.map((todo) => (
              <Todo
                deleteTodoById={deleteTodoById}
                toggleCompleted={toggleCompleted}
                key={todo._id}
                _id={todo._id}
                text={todo.text}
                completed={todo.completed}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2 className="text-3xl text-zinc-800 font-medium">
              You have no todos yet!
            </h2>
          </div>
        )}
      </section>

      <ToastContainer />
    </div>
  );
}
