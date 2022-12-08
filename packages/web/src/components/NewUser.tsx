import { useNavigate } from 'react-router-dom';

function NewUser() {
  const navigate = useNavigate();

  return (
    <div className="my-16 p-10 h-3/4 w-3/4 flex flex-col items-center justify-around drop-shadow-2xl rounded">
      <p className="text-center text-2xl font-bold">
        Não tem conta? Crie um novo Usuário! Caso já tenha conta, faça o login!
      </p>

      <button
        onClick={() => {
          navigate('/newUser');
        }}
        type="button"
        className="bg-green-400 h-2/6 w-1/4 rounded-lg text-2xl font-bold hover:bg-green-500"
      >
        Criar Usuário
      </button>
    </div>
  );
}

export default NewUser;
