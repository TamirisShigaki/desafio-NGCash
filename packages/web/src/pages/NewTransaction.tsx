/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { INewTransaction } from '../interfaces/NewTransactionInterface';
import { setNewTransfer } from '../services/API';
import useStore from '../store';
import NavBar from '../components/NavBar';
import FormSubmission from '../utils/FormSubmission';

function NewTransaction() {
  const [msgError, setMsgError] = useState<string | undefined>();
  const [validInput, setValidInput] = useState<boolean>(false);
  const logon = useStore((set) => set.logon);
  const token = useStore((set) => set.token);
  const navigate = useNavigate();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleClickTransfer = async () => {
    const transfer = await setNewTransfer({
      ...valuesInput,
      value: Number(valuesInput.value),
    } as INewTransaction, token);

    if (transfer?.data) {
      alert(transfer.data.message);
      navigate('/');
    } else {
      setMsgError(transfer as unknown as string);
      setValidInput(true);
    }
  };

  const { onChange, onSubmit, valuesInput } = FormSubmission(handleClickTransfer, {} as INewTransaction);

  return (
    <div className="h-screen w-screen">
      <NavBar buttonText={logon ? 'Logout' : 'Login'} />

      <div className="flex items-center justify-center mt-16">
        <form
          className="flex flex-col justify-evenly items-center drop-shadow-2xl border border-black rounded h-3/5 w-2/4 p-4"
          onSubmit={onSubmit}
        >
          <div className="w-1/2 flex flex-col items-center gap-4 font-bold text-xl">
            <div className="w-full mb-4">
              <label htmlFor="username">
                Nome do Favorecido
                <input
                  className="rounded h-9 w-full mt-3 drop-shadow-lg p-6 font-normal text-lg"
                  onChange={onChange}
                  name="username"
                  type="text"
                  placeholder="Ex: Afonso Silva"
                />
              </label>
            </div>

            <div className="w-full mb-4">
              <label htmlFor="value">
                Valor
                <input
                  className="rounded h-9 w-full mt-3 drop-shadow-lg p-6 font-normal text-lg"
                  onChange={onChange}
                  name="value"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 23,68"
                />
              </label>
            </div>
          </div>

          {validInput && <span className="text-red-500 text-lg">{msgError}</span>}

          <div className="w-3/5 h-24 flex justify-evenly mt-4">
            <button className="bg-green-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-green-400" name="entrar" type="submit">
              Transferir
            </button>

            <button className="bg-red-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-red-400" onClick={handleClickCancel} type="button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTransaction;
