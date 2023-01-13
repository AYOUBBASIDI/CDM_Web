import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ClientGenre from '../components/ClientGenre.js';

function RegisterForm() {
    const receivedData = (genre) => {
      console.log(genre);
    }
    return (
        <div>
          <Header/>
          <ClientGenre getGenre={receivedData}/>
          <Footer/>
        </div>
    );
}

export default RegisterForm;
