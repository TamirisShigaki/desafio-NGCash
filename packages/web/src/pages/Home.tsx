import NavBar from '../components/NavBar';
import NewUser from '../components/NewUser';
import useStore from '../store';
import UserTransactions from '../components/UserTransactions';

function Home() {
  const logon = useStore((set) => set.logon);

  return (
    <div className="flex flex-col items-center h-screen">
      <NavBar buttonText={logon ? 'Logout' : 'Login'} />

      {logon ? <UserTransactions /> : <NewUser />}
    </div>
  );
}

export default Home;
