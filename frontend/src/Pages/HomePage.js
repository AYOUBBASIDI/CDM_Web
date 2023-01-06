import React from 'react';
import Header from '../components/Header.js';
import HomeContent from '../components/HomeContent.js';
import Footer from '../components/Footer.js';

function HomePage() {
    return (
        <div>
          <Header page="Home"/>
          <HomeContent/>
          <Footer/>
        </div>
    );
}

export default HomePage;
