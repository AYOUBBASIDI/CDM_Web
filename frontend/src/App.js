import './App.css';
import LoginForm from './Pages/LoginForm';
import RegisterForm from './Pages/RegisterForm.js';
import HomePage from './Pages/HomePage.js';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Client from './Pages/Client/Dashboard';
import Setting from './Pages/Client/Setting';
import NotFound from './Pages/404.js';

function App() {
  const isLogged = localStorage.getItem('isLogged');
  console.log(isLogged);
  if(isLogged == 'true'){
  return (
    <Router>
      <Routes>
        <Route path="/client/" element={<Client />} />
        <Route path="/client/setting" element={<Setting />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
  }else{
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
