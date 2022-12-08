import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ITransaction } from './interfaces/TransactionInterface';

type Store = {
    logon: boolean;
    token: string;
    transaction: ITransaction[] | string;

    setLogon: (_state: boolean) => void;
    setToken: (_token: string) => void;
    setTransaction: (_transaction: ITransaction[] | string) => void
};

const useStore = create<Store>()(
  devtools((set) => ({
    logon: false,
    token: 'token',
    transaction: 'Nenhuma transação!',

    setLogon(state: boolean) {
      set({ logon: state });
    },

    setToken(token: string) {
      set({ token });
    },

    setTransaction(state: ITransaction[] | string) {
      set({ transaction: state });
    },
  })),
);

export default useStore;
