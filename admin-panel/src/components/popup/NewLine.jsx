
import React, { useState , useEffect} from "react";
import { useForm } from "react-hook-form";
import './newLine.css'

const NewLine = props => {
     const { register, handleSubmit, reset} = useForm();
     const [stations, setStation] = useState([]);
     const [num, setNum] = useState(1);
     const [stationsName, setNameStation] = useState([]);
     const [stationsTime, setTimeStation] = useState([]);
     const handleClick = () =>{
          props.close(true);
     }

     //to remove last input station
     const removeStation = () =>{
          setNum(num-1);
          stations.pop();
          setStation(stations);
     }

     //to add new input station
     const addStation = () =>{
          setNum(num+1);
          setStation(oldArray => [...oldArray,num] );
          console.log(stations)
     }

     //to set values names station of inputs
     const setStationName = (id,value) => {
          stationsName[id-1] = value;
          setNameStation(stationsName);
     }

     //to set values times station of inputs
     const setStationTime = (id,value) => {
          stationsTime[id-1] = value;
          setTimeStation(stationsTime);
     }

     //get form data
     const onSubmit = (data) => {
          stationsName.unshift(data.departCity)
          stationsName.push(data.arriveCity);
          stationsTime.unshift(data.departTime)
          stationsTime.push(data.arriveTime);
          const line = {
               "lineNumber" : data.lineNumber,
               "carNumber" : data.busNumber,
               "citys" : stationsName,
               "times" : stationsTime,
               "availablePlaces" : data.seats,
               "reservedPlaces":[]
          }
          console.log(line)
     }


    return (
        <div className={`newline-popup ${!props.popup ? 'closed' : 'pop'}`}>
            <div className='form-new-line card'>
               <h3>Add New Agence</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                       <p>Nom</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("lineNumber")}
                            required 
                            />
                    </label>
                    <label>
                       <p>Adresse</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("busNumber")}
                            required 
                            />
                    </label>
                    <label>
                       <p>Telephone</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("seats")}
                            required 
                            />
                    </label>
                    <label>
                       <p>E-mail</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("seats")}
                            required 
                            />
                    </label>
                    <label>
                       <p>Ville</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("seats")}
                            required 
                            />
                    </label>
                    <label>
                       <div className='add-station sidebar__item-inner'>
                            Submit
                       </div>
                       <button></button>
                       <div onClick={handleClick} className='add-station sidebar__item-inner'>
                            Cancel
                       </div>
                    </label>
                </form>
            </div>
        </div>
    )
}


export default NewLine;