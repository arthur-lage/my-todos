import { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import { toast } from "react-toastify";
import { Plus, SignOut } from "phosphor-react";
import { Todo } from "../../components/Todo";
import { ThemeToggler } from "../../components/ThemeToggler";
import { Hamburger } from "../../components/Hamburger";

type Todo = {
  _id: string;
  text: string;
  completed: boolean;
};

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoText, setTodoText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

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

    if (todoText.length == 0) {
      //@ts-ignore
      toast.error("Your to-do can't be empty!", toastOptions);
      return;
    }

    try {
      setTodoText("");

      const res = await api.post("/todos", {
        text: todoText,
      });

      const newTodoList = res.data.todos;

      setTodos(newTodoList);
    } catch (err) {
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
    <div className="animation-fade transition-all duration-150 bg-white dark:bg-[#262626] min-h-[100vh]">
      <header className="dark:bg-[#181818] header-shadow flex items-center justify-between px-12 py-4">
        <h1 className="small:text-[2rem] font-bold text-zinc-800 dark:text-white text-[2.4rem] tracking-wider">
          my_todos
        </h1>
        <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <form className="mt-20 mxl:flex-col mxl:gap-8 w-[70vw] tablet:w-[95vw] mx-auto flex items-center justify-between self-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="p-3 border-[1px] text-2xl w-[60rem] tablet:w-[75vw] rounded-md border-blue-600"
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

        <div className="flex items-center gap-8">
          <button
            type="button"
            className="font-medium hover:brightness-125 text-white bg-blue-600 transition-all duration-150 p-4 rounded-xl w-[15rem]"
            onClick={deleteAllTodos}
          >
            Clear all todos
          </button>
        </div>
      </form>

      <section className="flex w-full justify-center mt-16 p-2">
        {todos !== null && todos.length > 0 ? (
          <div className="shadow-[0_0_15px_10px_rgba(0,0,0,0.1)] py-4 rounded-md overflow-x-hidden w-[70vw] tablet:w-[80vw] px-4 max-h-[35rem] scrollbar scrollbar-thin scrollbar-thumb-blue-600 dark:scrollbar-thumb-blue-400  overflow-y-scroll flex flex-col gap-5">
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
            <h2 className="text-3xl text-zinc-800 dark:text-white font-medium">
              You have no todos yet!
            </h2>
          </div>
        )}
      </section>

      <ToastContainer />
    </div>
  );
}
