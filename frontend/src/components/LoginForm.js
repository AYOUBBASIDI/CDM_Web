import React from 'react';
import { useState , useContext } from 'react';
import loginIcon from '../assets/img/login.svg';
import emptyIcon from '../assets/img/empty.svg';
import cancelIcon from '../assets/img/cancel.svg';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'
import axios from 'axios';

function LoginFormComponent() {
    const numbers = [0,1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
    const [pwd, setpwd] = useState('')
    const handleNumberClick = (number) => {
        setpwd(pwd + number);
    }

    const handleDeleteNumber = () => {
        setpwd(pwd.slice(0, -1));
    }

    const handleEmptyPwd = () => {
        setpwd('');
    }

    const alert = useAlert()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
     } = useForm();
     const onSubmit = (data) => {
        data.password = pwd;
        axios.post('http://localhost:8080/api/cdm/auth', data)
        .then(res => {            
            if(res.data.message === 'No account'){
                alert.error(<p className='text-center'>Identifiant incorrect</p>, {timeout: 3000})
            }else if(res.data.message === 'Wrong password'){
                alert.error(<p className='text-center'>Mot de passe incorrect</p>, {timeout: 3000})
            }else{
                alert.success(<p className='text-center'>Your Logged In</p>, {
                    timeout: 3000,
                    onClose: async() => {
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        localStorage.setItem('token', res.data.accessToken);
                        localStorage.setItem('isLogged', true);
                        window.location.href = '/client/';
                    }
                })
            }
        })
        
     }
        
    return (
        <div>
            <div className='px-16 py-8 flex justify-between items-center flex flex-col gap-12'>
                <h1 className='text-3xl font-bold secondary-color'>ACCÉDER À MON ESPACE</h1>
                <div className='flex flex-col gap-4'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold'  type='number' placeholder='Identifiant' {...register('identifiant', { required: true })}/>
                                {errors.identifiant && <span className='third-color pl-1'>Identifiant is required</span>} 
                            </div>

                            <div className='flex flex-col'>
                                <input className='w-full h-12 border-2 border-gray-300 rounded-md px-4 outline-0 font-bold' value={pwd} type='password' placeholder='Mot de passe' {...register('password')}/>
                                {errors.password && <span className='third-color pl-1'>Mot de Passe is required</span>} 
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-wrap custom-width gap-x-8 gap-y-4'>
                                {numbers.map((item, index) => (
                                    <div key={index}>
                                        <button 
                                        onClick={() => handleNumberClick(item)}
                                        className='w-16 h-10 border-8 border-gray-300 rounded-md px-4 primary-back secondary-color border-none font-bold' type='button'>{item}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-8'>
                                <button onClick={() => handleDeleteNumber()}  className='w-16 h-10 border-8 border-gray-300 rounded-md px-4 third-back primary-color border-none font-bold' type='button'><img src={cancelIcon}/></button>
                                <button onClick={() => handleEmptyPwd()} className='w-16 h-10 border-8 border-gray-300 rounded-md px-4 secondary-back primary-color border-none font-bold flex items-center justify-center' type='button'><img src={emptyIcon}/></button>
                            </div>
                            <div>
                                <button className='w-40 h-10 border-8 border-gray-300 rounded-md px-4 bg-green-600 primary-color border-none font-bold flex items-center gap-4 justify-center' type='submit'>Entrer <img src={loginIcon}/></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default LoginFormComponent;