import React from 'react';
import etudiant from '../assets/img/etudiant.svg';
import femmes from '../assets/img/femmes.svg';
import autre from '../assets/img/autre.svg';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'
import axios from 'axios';

function ClientGenre(props) {
    const alert = useAlert()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
     } = useForm();
     const onSubmit = (data) => {
        console.log(data);
        axios.post('http://localhost:8080/api/cdm/register', data)
        .then(res => {
            alert.success(<p className='text-center'>Votre compte a été créé avec succès<br/>Vérifiez votre e-mail</p>, {
                timeout: 3000,
                onClose: () => {
                window.location.href = '/login';
                }
            }); 
        })  
     }

    const [genre, setGenre] = React.useState('');

    const [choosed, setChoosed] = React.useState(false);

    const cartes = [
        {
            name: 'Étudiant (e)',
            image: etudiant,
            value: 'etudiant'
        },
        {
            name: 'Femmes',
            image: femmes,
            value: 'femmes'
        },
        {
            name: 'Autre',
            image: autre,
            value: 'autre'
        },
    ];

    const handleClientGenre = (genre) => {
        setGenre(genre);
        setChoosed(true);
    }

    return (
        <div>
            {!choosed ?  
            <div className='px-16 py-8 flex justify-between items-center flex flex-col gap-12'>
                <h1 className='text-3xl font-bold secondary-color'>Devenir client Crédit du maroc</h1>
                <h4 className='text-2xl font-bold third-color'>Vous êtes</h4>
                <div className='flex gap-12 pb-8'>
                    {cartes.map((item, index) => (
                        <div onClick={() => handleClientGenre(item.value)} className='relative cursor-pointer' key={index}>
                            <img src={item.image}/>
                            <h1 className='absolute bottom-1 text-center w-full text-white text-3xl'>{item.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
            : null}
            {choosed ?  
            <div className='px-16 py-8 flex justify-between items-center flex flex-col gap-12'>
                <h1 className='text-3xl font-bold secondary-color'>Devenir client Crédit du maroc</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    <div className='flex gap-4'>

                        <div className='flex flex-col'>
                            <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Nom' {...register('nom', { required: true })}/>
                            {errors.nom && <span className='third-color pl-1'>Nom is required</span>} 
                        </div>

                        <div className='flex flex-col'>
                            <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Prenom' {...register('prenom', { required: true })}/>
                            {errors.prenom && <span className='third-color pl-1'>Prenom is required</span>} 
                        </div>   

                    </div>

                    <div className='flex gap-4'>

                        <div className='flex flex-col'>
                            <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Email adresse' {...register('email', { required: true })}/>
                            {errors.email && <span className='third-color pl-1'>Email adresse is required</span>} 
                        </div> 

                        <div className='flex flex-col'>
                            <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Téléphone' {...register('tel', { required: true })}/>
                            {errors.tel && <span className='third-color pl-1'>Téléphone is required</span>} 
                        </div> 

                    </div>
                    <div className='flex gap-4'>

                        <div className='flex flex-col'>
                            <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Carte national' {...register('cin', { required: true })}/>
                            {errors.cin && <span className='third-color pl-1'>Carte national is required</span>} 
                        </div> 

                        <div className='flex flex-col'>
                            <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Agence' {...register('agence', { required: true })}/>
                            {errors.agence && <span className='third-color pl-1'>Agence is required</span>} 
                        </div> 

                    </div>
                    <div className='flex flex-col'>
                        <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' type='text' placeholder='Adresse' {...register('address', { required: true })}/>
                        {errors.address && <span className='third-color pl-1'>Adresse is required</span>} 
                    </div> 

                    <input type='text' hidden value={genre} {...register('type')}/>
                    <input type='text' hidden value='client' {...register('role')}/>

                    <div className='flex justify-between'>
                        <button className='w-1/5 text-gray-500 bg-gray-300 flex p-3 items-center font-bold rounded-lg justify-center'>ANNULER</button>
                        <button className='w-2/5 secondary-back flex p-3 items-center font-bold rounded-lg primary-color justify-center' type="submit">CREER MON COMPTE</button>
                    </div>

                </form>
            </div>
            : null}
        </div>
    );
}

export default ClientGenre;