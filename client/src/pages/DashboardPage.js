import { useState } from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Navbar from '../components/Navbar';


const Dashboard = () =>{
    const location = useLocation();


    const status = location.state?.status || 'Brak statusu';
    console.log(status);

    return(
        <>
            <Navbar userType={status} />
            <Outlet/>
        </>
        
    );
}

export default Dashboard;
