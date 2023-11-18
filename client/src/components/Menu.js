import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';


const Menu = ({type}) =>{

    const navigate = useNavigate();
    const [userType, setUserType] = useState();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));

        setUserType(user.staffStatus);
    },[]);
    const [active, setActive] = useState();
    return(
        <div id="menuLine">
            <div className="content">
            <div id="menu">
                {userType == 2 ? (
                    <>
                    <div className="menuPart active" onClick={() => { navigate('/dashboard/templates') }}><a>Templates</a></div>
                    <div className="menuPart" onClick={() => { navigate('/dashboard/profile') }}><a>Profile</a></div>
                    </>
                ) : (
                    <>
                    <div className="menuPart active" onClick={() => { navigate('/dashboard/documents') }}><a>Documents</a></div>
                    <div className="menuPart"><a>Part 2</a></div>
                    <div className="menuPart"><a>Part 3</a></div>
                    <div className="menuPart" onClick={() => { navigate('/dashboard/profile') }}><a>Profile</a></div>
                    </>
                )}
                </div>
            </div>
           
        </div>
    );
}

export default Menu;