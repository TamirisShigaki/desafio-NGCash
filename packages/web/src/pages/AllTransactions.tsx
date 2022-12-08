/* eslint-disable no-use-before-define */
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import useStore from '../store';
import Transactions from '../components/Transactions';
import { getTransaction } from '../services/API';

function AllTransactions() {
  const navigate = useNavigate();
  const logon = useStore((set) => set.logon);
  const token = useStore((set) => set.token);
  const setTransaction = useStore((set) => set.setTransaction);

  const handleClickSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as {date?: Date | undefined, typeSearch?: string};

    console.log(data);

    if (data.typeSearch === 'credited') {
      const history = await getTransaction({ date: (data.date ? data.date : undefined), credited: true }, token);

      if (history.data) {
        setTransaction(history.data);
      } else {
        setTransaction('Nenhuma transação encontrada');
      }
    } else if (data.typeSearch === 'debited') {
      const history = await getTransaction({ date: (data.date ? data.date : undefined), debited: true }, token);

      if (history.data) {
        setTransaction(history.data);
      } else {
        setTransaction('Nenhuma transação encontrada');
      }
    } else {
      const history = await getTransaction({ date: (data.date ? data.date : undefined) }, token);

      if (history.data) {
        setTransaction(history.data);
      } else {
        setTransaction('Nenhuma transação encontrada');
      }
    }
  };

  return (
    <div className="h-screen w-screen">
      <NavBar buttonText={logon ? 'Logout' : 'Login'} />

      <div className="flex justify-center items-center h-5/6 w-full">
        <div className="bg-slate-300 flex flex-col items-center justify-between rounded drop-shadow-2xl h-4/5 w-3/4  mt-8">

          <form className="flex justify-evenly items-center drop-shadow-2xl rounded font-bold text-lg w-full h-1/6" onSubmit={handleClickSubmit}>

            <label htmlFor="typeSearch" className="flex gap-3 items-center">
              Pesquisar por:
              <select name="typeSearch" id="typeSearch" className="border border-black drop-shadow-2xl rounded text-center">
                <option value="all">Transações</option>
                <option value="credited">Entrada</option>
                <option value="debited">Saida</option>
              </select>
            </label>

            <label htmlFor="date" className="flex gap-3 items-center">
              Data:
              <input id="date" name="date" type="date" className="border border-black drop-shadow-2xl rounded text-center" />
            </label>

            <button type="submit" className="bg-teal-600 h-1/2 w-1/6 rounded-lg text-xl font-bold border border-teal-600 hover:bg-teal-500">
              Pesquisar
            </button>

            <button
              onClick={() => navigate('/')}
              type="button"
              className="bg-red-500 h-1/2 w-1/6 rounded-lg text-xl font-bold border border-red-500 hover:bg-red-600"
            >
              Voltar
            </button>

          </form>

          <Transactions qntTransactions={0} title="Transações" />
        </div>
      </div>
    </div>
  );
}

export default AllTransactions;
