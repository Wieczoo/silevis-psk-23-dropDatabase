import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';


const Menu = ({type}) =>{

    const navigate = useNavigate();
    const [userType, setUserType] = useState();

    const [menuActive, setMenuActive] = useState(0);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));

        setUserType(user.staffStatus);

        const currentUrl = window.location.href;
 
        const urlObject = new URL(currentUrl);
    
        const lastPathSegment = urlObject.pathname.split('/').pop();
    
        console.log('Ostatnia część URL-a:', lastPathSegment);
        switch(lastPathSegment)
        {
            case 'templates':
                setMenuActive(1);
                break;
            case 'profile':
                setMenuActive(4);
                break;
            case 'universitysupervisor':
                setMenuActive(1);
                break;
            case 'documents':
                setMenuActive(3);
                break;
            default:
                setMenuActive(0);
                break;
        }

    },[]);
    const [active, setActive] = useState();
    return(
        <div id="menuLine">
            <div className="content">
            <div id="menu">
                {userType == 2 ? (
                    <>
                    <div className={menuActive==1? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(1);navigate('/dashboard/templates') }}><a>Templates</a></div>
                    <div className={menuActive==2? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(2);navigate('/dashboard/universitysupervisor') }}><a>University Supervisor</a></div>
                    </>
                ) : (
                    <>
                    <div className={menuActive==3? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(3);navigate('/dashboard/documents') }}><a>Documents</a></div>
                    {/* <div className="menuPart"><a>Part 2</a></div>
                    <div className="menuPart"><a>Part 3</a></div> */}
                    </>
                )}
                    <div className={menuActive==4? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(4);navigate('/dashboard/profile') }}><a>Profile</a></div>
                </div>
            </div>
           
        </div>
    );
}

export default Menu;