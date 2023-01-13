import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


const Popup = ({ operation, open, type, sender, handleConfirm }) => {
    
    const [montant, setMontant] = useState(0);
    const [typeRecharge, setTypeRecharge] = useState('');
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
     } = useForm();
        const onSubmit = (data) => {

            if(type === 'virement'){
              const token = localStorage.getItem('token'); 
              data.amount = parseInt(data.amount);
              data.sender = sender.identifiant;
              const options = {
                  url: 'http://localhost:8080/api/cdm/transactions',
                  method: 'POST',
                  headers: {
                      'Authorization': 'Bearer ' + token,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8'
                  },
                  data: data
                };
                axios(options)
                  .then(response => {
                    console.log(response.data);
                  });
            }else{
              if(montant === 0){
                setError('Choose a montant of recharge');
              }else if(typeRecharge === ''){
                setError('Choose a type of recharge');
              }else{
                data.receiver = type;
                data.sender = sender.identifiant;
                data.amount = montant;
                const token = localStorage.getItem('token');
                const options = {
                  url: 'http://localhost:8080/api/cdm/recharge',
                  method: 'POST',
                  headers: {
                      'Authorization': 'Bearer ' + token,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8'
                  },
                  data: data
                };
                axios(options)
                  .then(response => {
                    console.log(response.data);
                  });
              }
            }
            reset();
            handleConfirm(true);
        }

        const mantantsRecharge = [10,20,30,40,50];
        const typesRecharge = ['*1', '*2', '*3', '*6'];

        const SaveMontantRecharge = (montant) => {
            setMontant(montant);
            if(error == 'Choose a montant of recharge'){
              setError('');
            }
        }
        const SaveTypeRecharge = (type) => {
          setTypeRecharge(type);
          if(error == 'Choose a type of recharge'){
            setError('');
          }
      }

      const handleCancel = () => {
        setMontant(0);
        setTypeRecharge('');
        reset();
        handleConfirm(false);
      }
    
    return (
      <>
        <div className={open ? 'w-1/3 popup-back duration-500 z-50 rounded-lg absolute popup show' : 'w-1/3 h-64 popup-back duration-500 z-50 rounded-lg absolute popup'}>
          <div className="flex flex-col items-center p-6 gap-3">
            <h4 className="text-2xl font-bold secondary-color">Nouvelle opération</h4>
            <h2 className="text-xl font-bold secondary-color">{operation} {type !== 'virement' && '(' + type + ')'}</h2>
            <h2 className="third-color font-bold">Solde : {sender.solde},00 DH</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-2/3 justify-center align-center">
                {type === 'virement' && 
                <>
                <div className='flex flex-col'>
                    <input type="number" className="w-full h-10 border-2 border-gray-300 rounded-md px-4 outline-0" placeholder="Entrer bénéficiaire" {...register('receiver', { required: true })}/>
                    {errors.receiver && <span className='third-color pl-1'>Champ obligatoire</span>} 
                </div>
                <div className='flex flex-col'>
                    <input type="number" className="w-full h-10 border-2 border-gray-300 rounded-md px-4 outline-0" placeholder="Entrer Montant" {...register('amount', { required: true , max:sender.solde , min:10 })}/>
                    {errors.amount && <span className='third-color pl-1'>Montant invalide</span>} 
                </div>
                </>
                }
                {operation === 'Recharge le solde' &&
                <>
                <p className='third-color'>{error}</p>
                <p>Montant de recharge : {montant} DH</p>
                <div className='flex gap-7'>
                  {mantantsRecharge.map((mantant, index) => (
                    <button type="button" onClick={()=>SaveMontantRecharge(mantant)} className='w-10 h-8 border-8 border-gray-300 rounded-md primary-back secondary-color border-none font-bold' key={index}>{mantant}</button>
                  ))}
                </div>
                <p>Type de recharge : {typeRecharge}</p>
                <div className='flex gap-7'>
                  {typesRecharge.map((type, index) => (
                    <button type="button" onClick={()=>SaveTypeRecharge(type)} className='w-16 h-8 border-8 border-gray-300 rounded-md primary-back secondary-color border-none font-bold' key={index}>{type}</button>
                  ))}
                </div>
                <div className='flex flex-col'>
                    <input type="number" className="w-full h-10 border-2 border-gray-300 rounded-md px-4 outline-0" placeholder="Entrer your Numero de telephone" {...register('phone', { required: true })}/>
                    {errors.phone && <span className='third-color pl-1'>Numero de telephone obligatoire</span>} 
                </div>
                </>
                }
              
                <div className='flex flex-col'>
                    <input type="password" className="w-full h-10 border-2 border-gray-300 rounded-md px-4 outline-0" placeholder="Entrer your Password" {...register('password', { required: true })}/>
                    {errors.password && <span className='third-color pl-1'>password obligatoire</span>} 
                </div>
                    

                
                <div className="flex gap-2">
                    <input type="button" className="w-full h-10 border-2 border-gray-400 rounded-md px-4 outline-0 text-gray-500 font-bold cursor-pointer" value="Annuler" onClick={() => handleCancel()}/>
                    <input type="submit" className="w-full h-10 border-2 border-color rounded-md px-4 outline-0 third-back text-white font-bold cursor-pointer" value="Confirmé"/>
                </div>

            </form>
          </div>
        </div>
        <div 
          className="w-screen h-screen hidden fixed top-0 left-0 z-10 overlay" 
          onClick={() => handleCancel()} 
        />
      </>
    )
  }

    export default Popup