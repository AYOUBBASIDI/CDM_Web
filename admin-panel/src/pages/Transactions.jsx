import React, { useEffect , useState } from 'react'

import Table from '../components/table/Table'

import axios from 'axios'

// import customerList from '../assets/JsonData/customers-list.json'

const customerTableHead = [
    'Identifiant',
    'Sender',
    'Type',
    'Receiver',
    'Date',
    'Amount',
    'Status'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.user.identifiant}</td>
        <td>{item.user.nom} {item.user.prenom}</td>
        <td>{item.type}</td>
        <td>{item.object}</td>
        <td>{item.date}</td>
        <td>{item.amount}</td>
        <td>Active</td>
    </tr>
)

const Customers = () => {
    const [Transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                url: 'http://localhost:8080/api/cdm/admin/allTransactions',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios.request(options).then(function (response) {
                console.log(response.data)
                setTransactions(response.data)
            }).catch(function (error) {
                console.error(error)
            })
        }
        getData()
    }, [])

    return (
        <div>
            <h2 className="page-header">
                Transactions
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            { //check if Transactions is empty
                                Transactions.length > 0 ? (
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={
                                    Transactions.length > 0 ? Transactions : []
                                }
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                                ) : (
                                    <div className="text-center">
                                        <h3>There is no transaction</h3>
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
