import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RevealPasswordButton } from "../../components/RevealPasswordButton";
import { ThemeToggler } from "../../components/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validators";

export function Register() {
  const [name, setName] = useState("");
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

    if (!validateName(name)) {
      //@ts-ignore
      toast.error("Invalid email.", toastOptions);
    }

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
      .post("/users", {
        name,
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
    <div className="animation-fade transition-all duration-150 bg-white dark:bg-[#252525] flex flex-col items-center justify-center h-[100vh] gap-8">
      <ThemeToggler />

      <h1 className="font-bold text-zinc-800 dark:text-white text-[3.2rem] tracking-wider">
        my_todos
      </h1>

      <h2 className="font-medium text-zinc-700 dark:text-white text-[2.4rem] tracking-normal">
        Register
      </h2>

      <div className="pointer-events-none opacity-30 dark:opacity-20 absolute tablet:hidden desktop:top-[-25rem] desktop:right-[-40rem] top-[-15rem] right-[-20rem] w-[64rem] h-[64rem] bg-blue-700 rounded-full"></div>
      <div className="pointer-events-none opacity-40 dark:opacity-20 absolute tablet:hidden desktop:bottom-[-25rem] desktop:left-[-40rem] bottom-[-15rem] left-[-20rem] w-[40rem] h-[40rem] bg-blue-600 rounded-full"></div>
      <div className="pointer-events-none opacity-60 dark:opacity-10 absolute tablet:hidden desktop:bottom-[60rem] desktop:left-[40rem] bottom-[40rem] left-[20rem] w-[20rem] h-[20rem] bg-blue-600 rounded-full"></div>

      <form className="flex flex-col gap-12" onSubmit={handleSubmitForm}>
        <div>
          <input
            type="text"
            className="p-3 border-2 text-2xl w-[30rem] tablet:w-[25rem] rounded-md border-zinc-700"
            placeholder="Type your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="p-3 border-2 text-2xl w-[30rem] tablet:w-[25rem] rounded-md border-zinc-700"
            placeholder="Type your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            type={isShowingPassword ? "text" : "password"}
            className="p-3 border-2 text-2xl w-[30rem] tablet:w-[25rem] rounded-md border-zinc-700"
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
          to="/login"
        >
          Already have an account? Login
        </Link>

        <button
          className="bg-blue-700 text-white text-2xl rounded-[50rem] p-4 w-32 hover:brightness-125 transition-all duration-200"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
