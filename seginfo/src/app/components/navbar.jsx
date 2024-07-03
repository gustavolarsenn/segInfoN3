import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <h1>Sistema de despesas</h1>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <Link href="/register">Cadastro</Link>
          </li>
          <li>
            <Link href="/signature">Assinaturas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
