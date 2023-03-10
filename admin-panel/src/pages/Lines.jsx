
import Table from '../components/table/Table'
import NewLine from '../components/popup/NewLine'
import React, { useState , useEffect} from "react";
import axios from 'axios'
import LinesList from '../assets/JsonData/lines-list.json'

const customerTableHead = [
    '#',
    'Nom',
    'Adresse',
    'Telephone',
    'E-mail',
    'Ville',
    'Operations'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index+1}</td>
        <td>{item.nom}</td>
        <td>{item.adresse}</td>
        <td>{item.tel}</td>
        <td>{item.email}</td>
        <td>{item.ville}</td>
        <td><a className="operation"><i className="bx bx-trash"></i></a> <a className="operation"><i className="bx bx-edit"></i></a></td>
    </tr>
)

const Customers = () => {
    const [popup, display] = useState(false);
    const handleClick = () =>{
        display(true);
    }
    const close = () =>{
        display(false);
    }
    
    const [Agences, setAgences] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                url: 'http://localhost:8080/api/cdm/agences',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios.request(options).then(function (response) {
                console.log(response.data)
                setAgences(response.data)
            }).catch(function (error) {
                console.error(error)
            })
        }
        getData()
    }, [])

    return (
        <div>
            <div className='top-lines'>
                <h2 className="page-header">
                    Agences
                </h2>
                <button className='add-lines' onClick={handleClick}>New Line</button>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            { //check if Agences is empty
                                Agences.length > 0 ? (
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={
                                    Agences.length > 0 ? Agences : []
                                }
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                                ) : (
                                    <div className="text-center">
                                        <h3>There is no agence</h3>
                                    </div>
                                )
                            }
                            <NewLine
                                popup={popup}
                                close={close}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Customers
