import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RevealPasswordButton } from "../../components/RevealPasswordButton";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  const { handleSetToken } = useAuth();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    if (name.length == 0) return;
    if (email.length == 0) return;
    if (password.length == 0) return;

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
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmitForm}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Type your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <Link to="/login">Already have an account? Login</Link>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
