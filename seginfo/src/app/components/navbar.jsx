"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.post('http://localhost:8000/users/current', {}, { 
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true 
    })
    .then(response => {
      setCurrentUser(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the current user:', error);
      setError('Failed to fetch current user.');
    });
  }, []);

  if (error) {
    return <p>Error loading user data: {error}</p>;
  }

  // Ensure currentUser is not null before trying to access its properties
  if (!currentUser) {
    return <p>Loading user data...</p>;
  }

  const { type } = currentUser; // Destructure type from currentUser

  return (
    <div className="navbar text-white bg-lightblue">
      <Link href="/dashboard" className="btn btn-ghost text-xl">
        Sistema de despesas
      </Link>
      <div className="flex items-center">
        <ul className="menu menu-horizontal p-0">
          {/* Conditional rendering based on type */}
          {type === 'Colaborador' && (
            <>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li tabIndex={0} className="dropdown dropdown-hover">
              <a className="dropdown-toggle">
                Cadastro
              </a>
              <ul className="dropdown-content bg-lightblue menu p-2 shadow rounded-box w-52">
                <li>
                  <Link href="/register">Despesa</Link>
                </li>
              </ul>
            </li>
            </>
          )}
          {(type === 'Gerente') && (
            <>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li tabIndex={0} className="dropdown dropdown-hover">
              <a className="dropdown-toggle">
                Cadastro
              </a>
              <ul className="dropdown-content bg-lightblue menu p-2 shadow rounded-box w-52">
                <li>
                  <Link href="/employee">Funcionário</Link>
                </li>
                <li>
                  <Link href="/register">Despesa</Link>
                </li>
              </ul>
            </li>
              <li><Link href="/signature">Assinatura</Link></li>
            </>
          )}
          {type === 'Diretor' && (
            <>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li tabIndex={0} className="dropdown dropdown-hover">
              <a className="dropdown-toggle">
                Cadastro
              </a>
              <ul className="dropdown-content bg-lightblue menu p-2 shadow rounded-box w-52">
                <li>
                  <Link href="/employee">Funcionário</Link>
                </li>
                <li>
                  <Link href="/register">Despesa</Link>
                </li>
              </ul>
            </li>
            <li><Link href="/signature">Assinatura</Link></li>
            <li><Link href="/validate">Validar</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}