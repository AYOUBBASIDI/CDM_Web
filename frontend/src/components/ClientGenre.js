import React from 'react';
import etudiant from '../assets/img/etudiant.svg';
import femmes from '../assets/img/femmes.svg';
import autre from '../assets/img/autre.svg';

function ClientGenre() {

    const cartes = [
        {
            name: 'Étudiant (e)',
            image: etudiant
        },
        {
            name: 'Femmes',
            image: femmes
        },
        {
            name: 'Autre',
            image: autre
        },
    ];
    

    return (
        <div>
            <div className='px-16 py-8 flex justify-between items-center flex flex-col gap-12'>
                <h1 className='text-3xl font-bold secondary-color'>Devenir client Crédit du maroc</h1>
                <h4 className='text-2xl font-bold third-color'>Vous êtes</h4>
                <div className='flex gap-12 pb-8'>
                    {cartes.map((item, index) => (
                        <div className='relative cursor-pointer' key={index}>
                            <img src={item.image}/>
                            <h1 className='absolute bottom-1 text-center w-full text-white text-3xl'>{item.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClientGenre;