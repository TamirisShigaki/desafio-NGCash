/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormSubmission from '../utils/FormSubmission';
import { setNewUser } from '../services/API';
import type { ILogin } from '../interfaces/LoginInterface';

function CreateUser() {
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleSave = async () => {
    const createUser = await setNewUser(valuesInput as ILogin);

    if (createUser?.data) {
      alert('Usuário criado com sucesso');
      navigate('/login');
    } else {
      setMsgError(createUser as unknown as string);
      setInputValid(true);
    }
  };

  const { onChange, onSubmit, valuesInput } = FormSubmission(handleSave, {} as ILogin);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="h-2/3 w-2/3 my-12 py-5 flex flex-col justify-evenly items-center gap-6 drop-shadow-2xl border border-black rounded"
      >
        <div className="w-1/2 flex flex-col items-center gap-4 font-bold text-xl">
          <div className="w-full mb-4">
            <label htmlFor="username">
              *Nome de Usuário
              <input
                placeholder="Ex: Afonso Silva"
                name="username"
                onChange={onChange}
                className="w-full mt-3 rounded drop-shadow-lg px-5 py-1 font-normal text-lg"
                type="text"
              />
            </label>
          </div>

          <div className="w-full">
            <label htmlFor="password">
              *Senha
              <input
                placeholder="Mínimo de 8 caracteres, 1 maiúscula e 1 número"
                name="password"
                onChange={onChange}
                className="w-full mt-3 rounded drop-shadow-lg px-5 py-1 font-normal text-lg w-"
                type="password"
              />
            </label>
          </div>
        </div>

        {inputValid && <span className="text-red-500 text-lg">{msgError}</span>}

        <div className="w-3/5 mb-6 flex justify-evenly">
          <button
            name="entrar"
            className="bg-green-500 px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-400"
            type="submit"
          >
            Criar
          </button>

          <button
            onClick={handleClickCancel}
            type="button"
            className="bg-red-500 px-6 py-3  rounded-lg text-xl font-bold hover:bg-red-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
