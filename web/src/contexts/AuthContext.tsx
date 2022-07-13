import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextProps {
  token: string | null;
  handleSetToken: (token: string) => void;
  currentUser: User | null;
  handleSetCurrentUser: (user: User) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

type AuthType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthType) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  function handleSetToken(token: string | null) {
    localStorage.setItem("my_todos:token", JSON.stringify(token));
    setToken(token);
  }

  function handleSetCurrentUser(user: User | null) {
    setCurrentUser(user);
  }

  useEffect(() => {
    if (localStorage.getItem("my_todos:token") !== null) {
      setToken(JSON.parse(localStorage.getItem("my_todos:token") as string));
    }

    if (token === null) {
      return;
    }

    //@ts-ignore
    api.defaults.headers.authorization = `Bearer ${token}`;

    api
      .get("/users/auth")
      .then((res) => {
        handleSetCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  function handleLogout() {
    handleSetCurrentUser(null);
    handleSetToken(null);
    localStorage.setItem("my_todos:token", JSON.stringify(null));
  }

  const value = {
    token,
    handleSetToken,
    currentUser,
    handleLogout,
    handleSetCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
