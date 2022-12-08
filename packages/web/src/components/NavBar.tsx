import { useNavigate } from 'react-router-dom';
import logoNG from '../images/logoNG.svg';
import useStore from '../store';

type NavBarProps = {
    buttonText: string;
};

function NavBar(props: NavBarProps) {
  const navigate = useNavigate();
  const setLogon = useStore((set) => set.setLogon);
  const setToken = useStore((set) => set.setToken);
  const setTransaction = useStore((set) => set.setTransaction);
  const { buttonText } = props;

  const handleClick = () => {
    if (buttonText === 'Login') {
      navigate('/login');
    } else {
      setLogon(false);
      setToken('token');
      setTransaction('Nenhuma transação!');
      navigate('/');
    }
  };

  return (
    <div className="flex justify-between items-center bg-black w-full h-20 px-10">
      <img className="h-20 w-48" src={logoNG} alt="Logo NGCash" />
      <button
        className="bg-green-400 h-3/5 w-1/5 rounded-lg text-xl font-bold hover:bg-green-500"
        onClick={handleClick}
        type="button"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default NavBar;
