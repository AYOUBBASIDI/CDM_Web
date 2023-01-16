import React, { useState , useEffect} from "react";
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Lines from '../pages/Lines'
import Access from './access/Access'

const Routes = () => {
    const [access, setAccess] = useState(sessionStorage.getItem('access'));
    if(access){
        return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/lines' component={Lines}/>
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
