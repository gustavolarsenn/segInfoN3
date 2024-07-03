import Navbar from "../components/navbar";

export default function Register() {
  return (
    <main>
      <Navbar />
      <div className="bg-white h-screen flex justify-center items-center px-5">
        <form className="p-12 rounded-lg w-96 max-w-full bg-white flex justify-center items-center flex-col gap-2 shadow-2xl">
          <h2 className="p-5 text-xl">Cadastro de despesas</h2>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <input type="text" className="grow" placeholder="Titulo" />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-white w-full">
            <input type="text" className="grow" placeholder="Valor" />
          </label>
            <textarea className="textarea textarea-bordered bg-white grow w-full" placeholder="Descrição"></textarea>
          <button type="submit" className="btn btn-info w-full text-white">
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
