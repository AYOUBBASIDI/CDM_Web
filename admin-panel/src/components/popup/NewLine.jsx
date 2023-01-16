
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
               <h3>Add New Line</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                       <p>Line Number</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("lineNumber")}
                            placeholder='##'
                            required 
                            />
                    </label>
                    <label>
                       <p>Bus Number</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("busNumber")}
                            placeholder='##'
                            required 
                            />
                    </label>
                    <label>
                       <p>Available Seats</p>
                            <input 
                            type='text'
                            name='linenumber'
                            {...register("seats")}
                            placeholder='##'
                            required 
                            />
                    </label>
                    <label>
                       <p>Line Depart</p>
                       <div className='inputs-section'>
                            <input 
                            type='text'
                            name='linenumber'
                            placeholder='Depart Name'
                            {...register("departCity")}
                            class="name"
                            required 
                            />
                            <input 
                            type='text'
                            name='linenumber'
                            placeholder='Depart Time'
                            {...register("departTime")}
                            class="time"
                            required 
                            /> 
                       </div> 
                    </label>
                    {stations.map((item, index) => (
                    <label>
                       <p>Line Station {item} {(item === stations.length)? <span onClick={removeStation}>Remove</span> : ''}</p>
                       <div className='inputs-section'>
                            <input 
                            type='text'
                            name='linenumber'
                            placeholder='Station Name'
                            onChange={(e) => setStationName(item,e.target.value)}
                            class="name"
                            required
                            />
                            <input 
                            type='text'
                            name='linenumber'
                            placeholder='Station Time'
                            onChange={(e) => setStationTime(item,e.target.value)}
                            class="time"
                            required 
                            /> 
                       </div>
                       
                    </label>
                    ))}
                    <label id='label-add-station'>
                       <div onClick={addStation} className='add-station sidebar__item-inner'>
                            Add Station
                       </div>
                    </label>
                    <label>
                       <p>Line Arrive</p>
                       <div className='inputs-section'>
                            <input 
                            type='text'
                            name='linenumber'
                            placeholder='Arrive Name'
                            {...register("arriveCity")}
                            class="name"
                            required 
                            />
                            <input 
                            type='text'
                            name='linenumber'
                            placeholder='Arrive Time'
                            {...register("arriveTime")}
                            class="time"
                            required 
                            /> 
                       </div>  
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