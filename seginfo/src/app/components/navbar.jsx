import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar text-white bg-lightblue">
      <Link href="/dashboard" className="btn btn-ghost text-xl">
        Sistema de despesas
      </Link>
      <div className="flex items-center">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
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
          <li>
            <Link href="/signature">Assinatura</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
