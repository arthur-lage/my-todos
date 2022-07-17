import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import { useAuth } from "../../hooks/useAuth";
import { RevealPasswordButton } from "../../components/RevealPasswordButton";
import { validateEmail, validatePassword } from "../../utils/validators";
import { toast, ToastContainer } from "react-toastify";
import { ThemeToggler } from "../../components/ThemeToggler";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  const { handleSetToken } = useAuth();

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

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    if (!validateEmail(email)) {
      //@ts-ignore
      toast.error("Invalid email.", toastOptions);
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password should have at least 6 characters, up to 20 characters",
        //@ts-ignore
        toastOptions
      );
    }

    api
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        handleSetToken(res.data.token);
      })
      .catch((err) => {
        //@ts-ignore
        toast.error(err.response.data.message, toastOptions);
      });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="animation-fade duration-150 transition-all bg-white dark:bg-[#252525] flex flex-col items-center justify-center h-[100vh] gap-8">
      <ThemeToggler />

      <div className="opacity-30 dark:opacity-20 absolute top-[-15rem] right-[-20rem] w-[64rem] h-[64rem] bg-blue-700 rounded-full"></div>
      <div className="opacity-40 dark:opacity-20 absolute bottom-[-15rem] left-[-20rem] w-[40rem] h-[40rem] bg-blue-600 rounded-full"></div>
      <div className="opacity-60 dark:opacity-10 absolute bottom-[40rem] left-[20rem] w-[20rem] h-[20rem] bg-blue-600 rounded-full"></div>

      <h1 className="font-bold dark:text-white text-zinc-800 text-[3.2rem] tracking-wider">
        my_todos
      </h1>

      <h2 className="font-medium dark:text-white text-zinc-700 text-[2.4rem] tracking-normal">
        Login
      </h2>

      <form className="flex flex-col gap-12" onSubmit={handleSubmitForm}>
        <div>
          <input
            className="p-3 border-2 text-2xl w-[30rem] rounded-md border-zinc-700"
            type="text"
            placeholder="Type your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            className="p-3 border-2 text-2xl w-[30rem] rounded-md border-zinc-700"
            type={isShowingPassword ? "text" : "password"}
            placeholder="Type your password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RevealPasswordButton
            //@ts-ignore
            className={"p-2 border-2 border-zinc-700 rounded-xl"}
            isShowingPassword={isShowingPassword}
            setIsShowingPassword={setIsShowingPassword}
          />
        </div>

        <Link
          className="text-zinc-900 dark:text-white hover:underline text-2xl"
          to="/register"
        >
          Don't have an account yet? Create one
        </Link>

        <button
          className="bg-blue-700 text-white text-2xl rounded-[50rem] p-4 w-32 hover:brightness-125 transition-all duration-200"
          type="submit"
        >
          Login
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
