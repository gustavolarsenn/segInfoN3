"use client";

import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createReport } from './report';

export default function Register() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    handleReportCreation();
    event.preventDefault();
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleReportCreation = async () => {
    try {
      const response = await createReport(title, value, description);

      if (response) {
        router.push("/dashboard");
        setTitle(""); 
        setValue("");
        setDescription(""); 
        console.log("Report created successfully");
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
          <h2 className="p-5 text-xl">Cadastro de despesas</h2>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <input type="text" className="grow" placeholder="Titulo" value={title} onChange={handleChangeTitle}/>
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <input type="text" className="grow" placeholder="Valor" value={value} onChange={handleChangeValue}/>
          </label>
            <textarea className="textarea textarea-bordered bg-white grow w-full" placeholder="Descrição"  value={description} onChange={handleChangeDescription}></textarea>
          <button type="submit" className="btn btn-info w-full text-white">
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
