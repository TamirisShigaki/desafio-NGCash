/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBalance } from '../services/API';
import useStore from '../store';
import loading from '../images/loading.gif';
import Transactions from './Transactions';

function UserTransactions() {
  const getToken = useStore((get) => get.token);
  const [balance, setBalance] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const currentBalance = async () => {
      const balanceAccount = await getBalance(getToken);

      setBalance(balanceAccount.data.balance);
    };
    currentBalance();
  }, []);

  return (
    <div className="flex flex-col items-center rounded h-4/5 w-2/4 gap-4 mt-6 border border-black">

      <div className="items-center justify-evenly w-full h-1/3 mt-4 text-center">
        {
            balance ? (
              <span className="text-3xl font-bold text-emerald-700">
                <h1 className="text-3xl font-bold text-black">Saldo atual: </h1>
                {balance.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </span>
            ) : <img className="h-2/5 w-full flex justify-center" src={loading} alt="imagem de loading" />
        }

        <div className="w-full h-24 flex justify-evenly">
          <button
            onClick={() => navigate('/transaction')}
            type="button"
            className="bg-teal-600 h-3/5 w-1/4 mt-4 rounded-lg text-xl font-bold hover:bg-teal-500"
          >
            Transferência
          </button>

          <button
            onClick={() => navigate('/cashOutIn')}
            type="button"
            className="bg-teal-600 h-3/5 w-1/4 mt-4 rounded-lg text-xl font-bold hover:bg-teal-500"
          >
            Extrato

          </button>
        </div>
      </div>

      <Transactions qntTransactions={-4} title="Ultimas Transações" />

    </div>
  );
}

export default UserTransactions;
