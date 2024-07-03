"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { login } from './login';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    handleLogin();
    event.preventDefault();
    // router.push("/dashboard");
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      if (response) {
        router.push("/dashboard");
        setUsername(""); 
        setPassword(""); 
        console.log("Logged in successfully");
      } else {
        setErrorMessage('Usuário não existe ou credenciais erradas!');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-lightblue px-5">
        <form
          onSubmit={handleSubmit}
          className="p-12 rounded-lg w-96 max-w-full bg-white flex justify-center items-center flex-col gap-2 shadow-2xl"
        >
          <h2>Faça seu login!</h2>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" value={username} onChange={handleChangeUsername}/>
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" placeholder="Password" value={password} onChange={handleChangePassword}/>
          </label>
          <button type="submit" className="btn btn-info w-full text-white">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
