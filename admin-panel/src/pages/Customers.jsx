import React, { useEffect , useState } from 'react'

import Table from '../components/table/Table'

import axios from 'axios'

// import customerList from '../assets/JsonData/customers-list.json'

const customerTableHead = [
    '#',
    'Nom & Prenom',
    'Phone',
    'E-mail',
    'CIN',
    'Agence',
    'Role',
    'Balance'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.identifiant}</td>
        <td>{item.nom} {item.prenom}</td>
        <td>{item.tel}</td>
        <td>{item.email}</td>
        <td>{item.cin}</td>
        <td>{item.agence}</td>
        <td>{item.role}</td>
        <td>{item.balance}</td>
    </tr>
)

const Customers = () => {
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                url: 'http://localhost:8080/api/cdm/admin/allUsers',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios.request(options).then(function (response) {
                console.log(response.data)
                setCustomerList(response.data)
            }).catch(function (error) {
                console.error(error)
            })
        }
        getData()
    }, [])

    return (
        <div>
            <h2 className="page-header">
                Customers
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            { //check if customerList is empty
                                customerList.length > 0 ? (
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={
                                    customerList.length > 0 ? customerList : []
                                }
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                                ) : (
                                    <div className="text-center">
                                        <h3>There is no customer</h3>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
