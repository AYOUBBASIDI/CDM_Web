import React, { useState , useEffect} from "react";
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Agences from '../pages/Lines'
import Access from './access/Access'
import Transactions from '../pages/Transactions.jsx'

const Routes = () => {
    const [access, setAccess] = useState(sessionStorage.getItem('access'));
    if(access){
        return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/agences' component={Agences}/>
            <Route path='/transactions' component={Transactions}/>
        </Switch>
    )
    }else{
        return (
            <Switch>
                <Route path="*" component={Access} />
                <Route  path="access/:id" component={Access}/>
            </Switch>
        )
    }
    
}

export default Routes
