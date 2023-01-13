import React from 'react';
import Header from '../../components/Header.js';
import iam from '../../assets/img/iam.svg';
import inwi from '../../assets/img/inwi.svg';
import orange from '../../assets/img/orange.svg';
import download from '../../assets/img/download.svg'
import axios from 'axios';
import { useEffect , useState , useContext } from 'react';
import Popup from '../../components/Popup.js';


function Dashboard() {
    const [currentDate, setDate] = useState('');
    const [load, loading] = useState(false);
    const [data, setData] = useState([]);
    const [activites, setActivites] = useState([]);
    const [sender , setSender] = useState({});
    const [operation , setOperation] = useState('');
    const [type , setType] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const UserFullName = user.nom + ' ' + user.prenom;

    const recharge = [
        {
            img : orange,
            name : 'Orange'
        },
        {
            img : inwi,
            name : 'Inwi'
        },
        {
            img : iam,
            name : 'IAM'
        }
    ];

    
    useEffect( () => {
        const date = getDate();
        setDate(date)
    });
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data);
            setActivites(data.activites);
            setSender({
                "identifiant" : data.user.identifiant,
                "solde" : data.solde
            });
        }
        fetchData();
    }, []);


    const [open, setOpen] = React.useState(false)
  
    const handleConfirm = result => {
        if (result) {
            const fetchData = async () => {
                const data = await getData();
                setData(data);
                setActivites(data.activites);
                setSender({
                    "identifiant" : data.user.identifiant,
                    "solde" : data.solde
                });
            }
            fetchData();
        }
        setOpen(false)
    }

    const Transfer = () => {
        setType("virement");
        setOpen(true);
        setOperation("Transfere l'argent");
        console.log(open, operation);
    }

    const Recharge = (name) => {
        setType(name);
        setOpen(true);
        setOperation("Recharge le solde");
        console.log(open, operation);
    }

    const telecharger = () => {
        loading(true);
        const token = localStorage.getItem('token'); 
        const user = JSON.parse(localStorage.getItem('user'));
        const options = {
            url: 'http://localhost:8080/api/cdm/download/'+user._id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+token,
            },
        };
        axios(options)
        .then(response => {
            console.log(response.data);
            setTimeout(() => {
                loading(false);
            }, 2000);
        });
    }

    
        
    return (
        <div>
            <Header page="Client"/>
            <div className='px-16 py-8 pb-7 flex gap-4 w-full justify-between'>
                <div className='flex flex-col gap-8'>
                    <p className='text-3xl font-bold text-gray-800'><span className='secondary-color text-4xl'>Bienvenu</span> {UserFullName}<br/><span className='text-2xl text-gray-400'>{currentDate}</span></p>
                    <div>
                        <div className='gap-2 flex justify-between flex-col shadow bg-white rounded-lg px-6 py-6'>
                            <p className='text-xl font-bold secondary-color'>Solde actuel</p>
                            <hr/>
                            <p className='text-5xl font-bold py-2 text-gray-800'>
                            {data.solde},00 DH 
                            <span className='text-lg'>Disponible</span></p>
                            <div className='pt-3 flex gap-3'>
                                <button className='border-color third-back p-1/2 px-8 rounded-xl primary-color' 
                                onClick={() => Transfer()}
                                >Transférer de l'argent</button>
                                <button className='border-color p-1/2 px-8 rounded-xl secondary-color'>Payer des factures</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'><div className='tiny-separated w-1/2'></div></div>
                    <div className='flex flex-col gap-4'>
                        <p className='text-2xl text-gray-500'>Rechargez votre solde</p>
                        <div className='flex gap-3'>
                            {recharge.map((item, index) => {
                                return (
                                    <div onClick={()=> Recharge(item.name)} className='gap-2 shadow bg-white rounded-lg px-6 py-6 flex items-center justify-center cursor-pointer'>
                                        <img src={item.img} />
                                    </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className='w-4/6'>
                    <div className='gap-2 flex justify-between flex-col shadow bg-white rounded-lg px-6 py-6'>
                        <div className='flex justify-between'>
                            <p className='text-xl font-bold secondary-color'>Activités récentes</p>
                            {
                                load?
                                (
                                    <div class="load">
                                        <div class="one"></div>
                                        <div class="two"></div>
                                        <div class="three"></div>
                                    </div>
                                ):(<p className='flex items-center gap-4 text-gray-800 font-bold cursor-pointer' onClick={() => telecharger()}>Télecharger relevé bancaire <img src={download}/></p>)
                            }
                            
                        </div>
                        <hr/>
                        <div className='overflow-y-auto scroll-max'>
                        <div className='flex text-lg font-semibold text-gray-400 pt-4 px-4'>
                                <p className='w-56'>Objet du paiement</p>
                                <p className='w-40'>Type</p>
                                <p className='w-40'>Date</p>
                                <p className='w-56'>Statut de paiement</p>
                                <p className='w-32'>Montant</p>
                            </div>
                            <hr/>
                            {   
                                activites.map((item, index) => {
                                    if(index % 2 == 0){
                                        return (
                                            <div className='flex text-base font-semibold py-4 px-4'>
                                                <p className='w-56'>{item.object}</p>
                                                <p className='w-40'>{item.type}</p>
                                                <p className='w-40'>{item.date}</p>
                                                <p className='w-56'><div className='secondary-color'>Complété</div></p>
                                                <p className='w-32'>{item.montant} DH</p>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className='flex text-base font-semibold py-4 primary-back px-4'>
                                                <p className='w-56'>{item.object}</p>
                                                <p className='w-40'>{item.type}</p>
                                                <p className='w-40'>{item.date}</p>
                                                <p className='w-56'><div className='secondary-color'>Complété</div></p>
                                                <p className='w-32'>{item.montant} DH</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Popup 
                operation={operation}
                open={open}
                type={type}
                sender={sender}
                handleConfirm={handleConfirm}
            />
        </div>
    );
}

const getData = async () =>{
    const data = [];
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
          }
    };
    await axios.get('http://localhost:8080/api/cdm/user/'+user._id,
    config
    )
    .then(res => {
        data["solde"] = res.data.balance.balance;
        data["user"] = res.data.user;
    }
    );
    await axios.get('http://localhost:8080/api/cdm/activites/'+user._id,config)
    .then(res => {
        data["activites"] = res.data.transactions;
    }
    );
    console.log(data)
    return data;
}

const getDate = () => {
    const date = new Date();
    const day = date.getDay();
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentDate = days[day] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    return currentDate;
}


export default Dashboard;
