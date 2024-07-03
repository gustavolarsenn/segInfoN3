import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar text-white bg-lightblue">
      <Link href="/dashboard" className="btn btn-ghost text-xl">
        Sistema de despesas
      </Link>
        <ul
          tabIndex={0}
          className="menu center-menu bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <a>Cadastro</a>
            <ul className="p-2">
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
  );
}
