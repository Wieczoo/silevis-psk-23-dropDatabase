import { useState } from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Navbar from '../components/Navbar';


const Dashboard = () =>{
    const location = useLocation();



    console.log()

    return(
        <>
            <Navbar userDatae="xD" />
            <Outlet/>
        </>
        
    );
}

export default Dashboard;
