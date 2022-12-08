import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import NewTransaction from './pages/NewTransaction';
import AllTransactions from './pages/AllTransactions';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<CreateUser />} />
        <Route path="/transaction" element={<NewTransaction />} />
        <Route path="/cashOutIn" element={<AllTransactions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
