export default function Grid() {
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
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
            <td>VALOR</td>
            <td>Purple</td>
            <td>
              <button className="btn btn-xs text-white bg-green-600 border-none">Assinado/Pendente</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

