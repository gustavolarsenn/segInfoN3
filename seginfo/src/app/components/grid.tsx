"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Report {
  _id: string;
  title: string;
  value: string;
  description: string;
  signature: string;
  validated: boolean;
}

export default function Grid() {
  const [data, setData] = useState<Report[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await axios.post(
        "http://localhost:8000/users/current",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (userId.data.type === "Colaborador") {
        const response = await axios.post(
          "http://localhost:8000/reports/id",
          {
            userid: userId.data._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = response.data;

        setData(data);
      } else {
        const response = await axios.post(
          "http://localhost:8000/reports",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = response.data;

        setData(data);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center">
      <h1 className="text-2xl p-10">Despesas</h1>
      <table className="table">
        <thead className="text-xl">
          <tr>
            <th>Despesa</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{item.title}</div>
                  </div>
                </div>
              </td>
              <td>{item.value}</td>
              <td>{item.description}</td>
              <td>{item.signature ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
