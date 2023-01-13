import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import LoginFormComponent from '../components/LoginForm.js';

function LoginForm() {
    return (
        <div>
          <Header/>
          <LoginFormComponent/>
          <Footer/>
        </div>
    );
}

export default LoginForm;
