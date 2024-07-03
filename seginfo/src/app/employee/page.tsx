"use client";

import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { register } from './register';

export default function Employee() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    handleRegister();
    event.preventDefault();
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  }

  const handleRegister = async () => {
    try {
      const response = await register(username, email, type, password);

      if (response) {
        router.push("/dashboard");
        setUsername(""); 
        setPassword(""); 
        setEmail("");
        setType("");
        console.log("Registered in successfully");
      } else {
        setErrorMessage('Usuário não existe ou credenciais erradas!');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  return (
    <main>
      <Navbar />
      <div className="bg-white h-screen flex justify-center items-center px-5">
        <form className="p-12 rounded-lg w-96 max-w-full bg-white flex justify-center items-center flex-col gap-2 shadow-2xl" onSubmit={handleSubmit}>
          <h2 className="p-5">Cadastro de funcionário</h2>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" value={username} onChange={handleChangeUsername} />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email"  value={email} onChange={handleChangeEmail}/>
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
            <input type="password" className="grow" placeholder="Password"  value={password} onChange={handleChangePassword}/>
          </label>
          <label className="items-center gap-2 bg-white w-full">
          <select className="select w-full max-w-xs input input-bordered flex items-center gap-2 bg-white w-full" value={type} onChange={handleChangeType}>
              <option>Colaborador</option>
              <option>Gerente</option>
              <option>Diretor</option>
          </select>
          </label>
          <button type="submit" className="btn btn-info w-full text-white">
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
