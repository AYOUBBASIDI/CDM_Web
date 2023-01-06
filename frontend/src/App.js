import './App.css';
import LoginForm from './Pages/LoginForm';
import RegisterForm from './Pages/RegisterForm.js';
import HomePage from './Pages/HomePage.js';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    //create a router to handle the routes for the app to navigate  between pages Login and Signup and home
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
