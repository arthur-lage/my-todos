import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import { useAuth } from "../../hooks/useAuth";
import { RevealPasswordButton } from "../../components/RevealPasswordButton";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  const { handleSetToken } = useAuth();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    if (email.length == 0) return;
    if (password.length == 0) return;

    api
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        handleSetToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmitForm}>
        <div className="input-field">
          <input
            type="email"
            placeholder="Type your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type={isShowingPassword ? "text" : "password"}
            placeholder="Type your password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RevealPasswordButton
            isShowingPassword={isShowingPassword}
            setIsShowingPassword={setIsShowingPassword}
          />
        </div>
        <Link to="/register">Don't have an account yet? Create one</Link>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
