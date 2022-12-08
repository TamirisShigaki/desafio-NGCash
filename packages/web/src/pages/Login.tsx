/* eslint-disable no-use-before-define */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useStore from '../store';
import { login } from '../services/API';
import type { ILogin } from '../interfaces/LoginInterface';
import FormSubmission from '../utils/FormSubmission';

function Login() {
  const [validInput, setValidInput] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string | undefined>();
  const navigate = useNavigate();
  const setLogon = useStore((set) => set.setLogon);
  const setToken = useStore((set) => set.setToken);

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleLogin = async () => {
    const user = await login(valuesInput as ILogin);

    if (user?.data) {
      setToken(user.data.token);
      setLogon(true);
      navigate('/');
    } else {
      setMsgError(user as unknown as string);
      setValidInput(true);
    }
  };

  const { onChange, onSubmit, valuesInput } = FormSubmission(handleLogin, {} as ILogin);

  return (
    <div className="p-10 flex items-center justify-center h-screen">
      <form
        className="flex flex-col justify-evenly items-center drop-shadow-2xl border border-black rounded h-4/5 w-2/4 gap-4"
        onSubmit={onSubmit}
      >
        <div className="w-1/2 flex flex-col items-center gap-4 font-bold text-xl">
          <div className="w-full mb-4">
            <label htmlFor="username">
              Login
              <input
                className="rounded h-9 w-full mt-3 drop-shadow-lg p-6 font-normal text-lg"
                name="username"
                onChange={onChange}
                type="text"
                placeholder="Ex: Afonso Silva"
              />
            </label>
          </div>

          <div className="w-full mb-4">
            <label htmlFor="password">
              Senha
              <input
                className="rounded h-9 w-full mt-3 drop-shadow-lg p-6 font-normal text-lg"
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Ex: SenhaAqui123"
              />
            </label>
          </div>
        </div>

        {validInput && <span className="text-red-500 text-lg">{msgError}</span>}

        <div className="w-3/5 h-24 flex justify-evenly">
          <button className="bg-green-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-green-400" name="entrar" type="submit">
            Entrar
          </button>

          <button className="bg-red-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-red-400" onClick={handleClickCancel} type="button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
