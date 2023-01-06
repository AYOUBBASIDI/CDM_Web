import React from 'react';
import enterIcon from '../assets/img/enter.svg';
import clientIcon from '../assets/img/client.svg';

function Header(page) {

    const handleRegister = () => {
        window.location.href = '/register';
    }

    const handleLogin = () => {
        window.location.href = '/login';
    }

    const handleHome = () => {
        window.location.href = '/';
    }


    return (
        <div>
            <div className='px-16 py-8 flex justify-between items-center'>
                <div className='w-32'>
                    <a className='w-full'>
                    <img className='cursor-pointer' onClick={handleHome} src="https://seeklogo.com/images/C/credit-du-maroc-logo-80D6D85982-seeklogo.com.png" alt="CDM Logo" /> 
                    </a>
                </div>
                {page.page === "Home" ?
                <div className='flex items-center gap-9'>
                    <button onClick={handleRegister} className='primary-back flex justify-between w-40 p-3 items-center font-bold rounded-lg secondary-color'><span className='w-7'><img src={clientIcon}/></span> DEVENIR CLIENT</button>
                    <button onClick={handleLogin} className='secondary-back flex justify-between w-56 p-3 items-center text-white font-bold rounded-lg primary-color'><span><img src={enterIcon}/></span> ACCÉDER À MON ESPACE</button>
                </div>
                : null}
            </div>
        </div>
    );
}

export default Header;
