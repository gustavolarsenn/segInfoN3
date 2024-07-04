"use client";

import { use, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import axios from "axios";

interface Report {
  _id: string;
  title: string;
  value: string;
  description: string;
  signature: string;
  validated: boolean;
}

export default function ValidateGrid() {
  const [data, setData] = useState<Report[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/reports");
      const data = await response.json();

      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const validateReport = async (_id: string) => {
    try {
      console.log(_id)
      const response = await axios.put('http://localhost:8000/reports/validate', {
        reportId: _id,
        signatureData: "Signed"
      }, { 
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      });
     
      console.log(response);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickValidate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    validateReport(target.value);
  }

    return (
      <div className="overflow-x-auto flex flex-col items-center">
      <h1 className="text-2xl p-10">Validar assinaturas</h1>
      <table className="table">
        <thead className="text-xl">
          <tr>
            <th>Despesa</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Assinado</th>
            <th>Validado</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
      data.map((item) => (
        <tr key={item._id}> {/* Assuming each item has a unique 'id' property for the key */}
          <td>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-bold">{item.title}</div> {/* Assuming 'name' is a property of the item */}
              </div>
            </div>
          </td>
          <td>{item.value}</td> {/* Replace 'value' with the actual property name */}
          <td>{item.description}</td> {/* Replace 'color' with the actual property name */}
          <td>{item.signature ? "Sim": "Não"}</td>
          <td>{item.validated ? "Sim": "Não"}</td>
          <td>
            <button className="btn btn-xs text-white bg-green-600 border-none" value={item._id} onClick={handleClickValidate}>Validar</button>
          </td>
          <td>
            <FaFilePdf className="text-2xl text-red-600 hover:cursor-pointer hover:opacity-50"/>
          </td>
        </tr>
      ))
  }
        </tbody>
      </table>
    </div>
    );
  }
  
  