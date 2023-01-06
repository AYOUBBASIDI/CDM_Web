import React from 'react';
import back1 from '../assets/img/back1.jpg';

function HomeContent() {

    const menu = [
        {
            name: 'Devenir client',
            link: '/register'
        },
        {
            name: 'Nos agences',
            link: '/agences'
        },
        {
            name: 'Nos cartes bancaires',
            link: '/cartes'
        },
        {
            name: 'Contactez nous',
            link: '/contact'
        },
        {
            name: 'Nos partenaires',
            link: '/partenaires'
        },
    ];

    const handleLink = (link) => {
        window.location.href = link;
    }

    return (
        <div>
            <div className='px-16 py-8'>
                <div className='flex justify-between flex-col shadow bg-white rounded-lg'>
                    <div className='w-full px-12 flex justify-between secondary-color font-bold text-xl py-5 px-16'>
                        {menu.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 cursor-pointer'><div className='w-1 h-6 secondary-back'></div><a onClick={() => handleLink(item.link)} className='link-hover'>{item.name}</a></div>
                        ))}
                    </div>
                    <div><img className='rounded-b-lg' src={back1}/></div>
                </div>
                
            </div>
        </div>
    );
}

export default HomeContent;