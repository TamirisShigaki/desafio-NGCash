/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { getBalance, getTransaction } from '../services/API';
import useStore from '../store';
import loading from '../images/loading.gif';

type transactionProps = {
    title: string;
    qntTransactions: number;
}

function Transactions(props: transactionProps) {
  const getToken = useStore((get) => get.token);
  const [accountId, setAccountId] = useState<string>();
  const transactions = useStore((set) => set.transaction);
  const setTransactions = useStore((set) => set.setTransaction);
  const { title, qntTransactions } = props;

  useEffect(() => {
    const currentBalance = async () => {
      const balanceAccount = await getBalance(getToken);
      const transactionAccount = await getTransaction({}, getToken);
      setAccountId(balanceAccount.data.accountId);
      setTransactions(transactionAccount.data);
    };
    currentBalance();
  }, []);

  return (
    <div className="bg-zinc-200 w-5/6 h-full p-2 border border-black text-center  flex flex-col justify-evenly text-lg font-bold mb-2">
      <span className="text-2xl">{title}</span>
      {
            transactions ? (
              typeof transactions === 'string'
            )
              ? (
                <div>
                  <span className="text-orange-400">{transactions}</span>
                </div>
              )
              : (
                transactions.slice(qntTransactions).reverse().map((transaction) => ((transaction.creditedAccountId === accountId) ? (
                  <div key={transaction.id}>
                    <span>{transaction.createdAt.slice(0, 10).replace(/([0-9]+)-([0-9]+)-([0-9]+)/, '$3/$2/$1')}</span>
                    <span>  Entrada  </span>
                    <span className="text-green-600">{`+ ${transaction.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</span>
                  </div>
                ) : (
                  <div key={transaction.id}>
                    <span>{transaction.createdAt.slice(0, 10).replace(/([0-9]+)-([0-9]+)-([0-9]+)/, '$3/$2/$1')}</span>
                    <span>  Saída </span>
                    <span className="text-red-600">{`- ${transaction.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</span>
                  </div>
                )))
              ) : <img className="h-2/5 w-full flex justify-center" src={loading} alt="imagem de loading" />
        }
    </div>
  );
}

export default Transactions;
