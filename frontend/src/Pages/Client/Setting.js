import React, { useEffect } from 'react';
import Header from '../../components/Header.js';
import { useState } from 'react';
import axios from 'axios';

function Setting() {  

    const user = JSON.parse(localStorage.getItem('user'));
    const accountStatus = JSON.parse(localStorage.getItem('status'));
    const [update , setUpdate] = useState(false);
    const [newPass , setNewPass] = useState(false);
    const [nom , setNom] = useState(user.nom);
    const [prenom , setPrenom] = useState(user.prenom);
    const [email , setEmail] = useState(user.email);
    const [tel , setTel] = useState(user.tel);
    const [agence , setAgence] = useState(user.agence);
    const [address , setAddress] = useState(user.address);
    const [pwd , setPwd] = useState('*********');
    const [ConfirmPwd , setConfirmPwd] = useState('');
    const [oldPwd, setOldPwd] = useState('');


    const handleUpdate = () => {
        console.log('update')
        setUpdate(true)
    }

    const handleCancel = () => {
        setNom(user.nom)
        setPrenom(user.prenom)
        setEmail(user.email)
        setTel(user.tel)
        setAgence(user.agence)
        setAddress(user.address)
        setUpdate(false)
    }

    const handleNewPass = () => {
        setNewPass(true)
        setPwd('');
    }

    const handleCancelNewPass = () => {
        setNewPass(false)
        setPwd('*********')
    }

    const handleSave = () => {
        //check if an input is empty
        if(nom === '' || prenom === '' || email === '' || tel === '' || agence === '' || address === ''){
            alert('Veuillez remplir tous les champs')
            return
        }else{
            const data = {
                nom : nom,
                prenom : prenom,
                email : email,
                tel : tel,
                agence : agence,
                address : address
            }
            const token = localStorage.getItem('token');
            const options = {
                url: 'http://localhost:8080/api/cdm/user/update/'+user._id,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data
            };
            axios(options).then(response => {
                console.log(response.data)
                localStorage.setItem('user',JSON.stringify(response.data))
                setUpdate(false)
                alert('Vos informations ont été mises à jour')
            })
            .catch(error => {
                console.log(error)
            })
        }        
    }

    const handleSaveNewPass = () => {
        //check if the new password is confirmed
        if(pwd === '' || ConfirmPwd === '' || oldPwd === ''){
            alert('Veuillez remplir tous les champs')
            return
        }else if(pwd !== ConfirmPwd){
            alert('Les mots de passe ne sont pas identiques')
        }else{
            const data = {
                oldPassword : oldPwd,
                newPassword : pwd
            }
            const token = localStorage.getItem('token');
            const options = {
                url: 'http://localhost:8080/api/cdm/user/updatePassword/'+user._id,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data
            };
            axios(options)
            .then(response => {
                console.log(response.data);
                setNewPass(false)
                setPwd('*********')
                setOldPwd('')
                setConfirmPwd('')
                alert('Mot de passe modifié avec succès')
            });
        }
            
    }

    const HandleDisable = () => {
        if (window.confirm("Voulez-vous vraiment désactiver votre compte ?")) {
            const token = localStorage.getItem('token');
            const options = {
                url: 'http://localhost:8080/api/cdm/user/disable/'+user._id,
                method: 'POST',
                headers: {
                },
                data: {}
            };
            axios(options)
            .then(response => {
                console.log(response.data);
                if (window.confirm("Votre compte a été désactivé avec succès. Voulez-vous vous disconnecter ?")) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.setItem('isLogged',false);
                    window.location.href = '/login';
                }else{
                    window.location.href = '/client/';
                }
            });
        } else {
            console.log("Declined")
        }
    }










    return (
        <div>
            <Header page="Client"/>
            <div className='px-64 py-6'>
            <div className='gap-4 flex align-center flex-col shadow bg-white rounded-lg px-12 py-8'>
                <h2 className='text-center text-2xl secondary-color font-bold'>Profile de '{nom + ' ' + prenom}'</h2>
                <p className='underline text-lg secondary-color font-bold'>Informations :</p>
                <div className='flex flex-wrap gap-x-20 gap-y-4 custom-w'>
                    <div className='w-1/4'>
                        <p>Nom :</p> 
                        <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' name='nom' type="text" onChange={e => setNom(e.target.value)} value={nom} disabled={!update}/>
                    </div>
                    <div className='w-1/4'>
                        <p>Prénom :</p>
                        <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' type="text" onChange={e => setPrenom(e.target.value)} value={prenom} disabled={!update}/>
                    </div>
                    <div className='w-1/4'>
                        <p>Email :</p>
                        <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' type="text" onChange={e => setEmail(e.target.value)}  value={email} disabled={!update}/>
                    </div>
                    <div className='w-1/4'>
                        <p>Telephone :</p>
                        <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' type="number" onChange={e => setTel(e.target.value)} value={tel} disabled={!update}/>
                    </div>
                    
                    <div className='w-1/4'>
                    <p>Agence :</p>
                    <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' type="text" onChange={e => setAgence(e.target.value)} value={agence} disabled={!update}/> 
                    </div>

                    <div className='w-1/4'>
                    <p>Aderesse :</p>
                    <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' type="text" onChange={e => setAddress(e.target.value)} value={address} disabled={!update}/>
                    </div>
                    
                    
                    
                </div>
                <div className='gap-8 flex justify-end'>
                    {!update ? <button className='border-color third-back p-1/2 px-8 rounded-lg primary-color'  onClick={()=> handleUpdate()}>Update</button> : 
                    <>
                        <button className='p-1/2 px-8 rounded-lg text-gray-500 border-2 border-gray-400'  onClick={()=> handleCancel()}>Annuler</button>
                        <button className='border-color third-back p-1/2 px-8 rounded-lg primary-color'  onClick={()=> handleSave()}>Confirme</button> 
                    </> 
                    }
                    
                </div>
                
                <p className='underline text-lg secondary-color font-bold'>Mot de Passe :</p>
                <div className='flex  flex gap-8'>
                    <div className='flex gap-8'>
                        <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' placeholder='New Password' type="password" value={pwd} onChange={e => setPwd(e.target.value)} disabled={!newPass}/>
                        {
                            newPass ? 
                            <>
                                <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' placeholder='Confirm New Password' type="password" onChange={e => setConfirmPwd(e.target.value)}/>
                                <input className='px-2 py-1 bg-gray-100 rounded-lg w-full' placeholder='Old Password' type="password" onChange={e => setOldPwd(e.target.value)}/>
                            </> : ''
                        }
                    </div>
                    { !newPass ? <button className='border-color third-back p-1/2 px-8 rounded-lg primary-color' onClick={()=> handleNewPass()}>Update</button> : 
                        <>
                            <button className='border-color third-back p-1/2 px-8 rounded-lg primary-color' onClick={()=>handleSaveNewPass()}>Confirme</button>
                            <button className='p-1/2 px-8 rounded-lg text-gray-500 border-2 border-gray-400' onClick={()=> handleCancelNewPass()}>Annuler</button>
                        </>
                    
                    }
                    
                </div>
                    {
                    accountStatus === "active" ?
                <div className='flex flex-row-reverse'>
                    <div className='third-color border-danger p-2  w-fit'>
                        <p className='underline text-lg font-bold'>Zone dangereuse :</p>
                        <p>Si vous désactivez votre compte, vous ne pourrez pas faire <br/> n'importe quelle opération</p>
                        <div className='text-right'>
                            <button  className='third-back p-1/2 px-8 rounded-lg secondary-back text-white' onClick={()=> HandleDisable()}>Désactivez</button>
                        </div>
                    </div>
                </div>
                :
                <div className='flex flex-row-reverse'>
                    <div className='text-green-600 border-green p-2  w-fit'>
                        <p className='underline text-lg font-bold'>Zone de confort :</p>
                        <p>Pour Activer votre compte Click sur le Bouton Activer</p>
                        <div className='text-right'>
                            <button  className='bg-green-600 p-1/2 px-8 rounded-lg text-white' onClick={()=> HandleDisable()}>Activer</button>
                        </div>
                    </div>
                </div>
                }
                
            </div>
            </div>
        </div>
    );
}


export default Setting;
