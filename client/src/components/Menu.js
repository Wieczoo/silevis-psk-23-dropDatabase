import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import text from '../language/language.json';

const Menu = ({type}) =>{

    const navigate = useNavigate();
    const [userType, setUserType] = useState();

    const [menuActive, setMenuActive] = useState(0);
    const [language, setLanguage] = useState();

   

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const lang = JSON.parse(localStorage.getItem("lang"));
        setLanguage(lang);
        console.log(language);
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
            case 'internships':
                setMenuActive(5);
                break;
            default:
                setMenuActive(0);
                break;
        }



    },[]);

    return( 
        <div id="menuLine">
            <div className="content">
            <div id="menu">
                {userType == 2 ? (
                    <>
                    <div className={menuActive==1? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(1);navigate('/dashboard/templates') }}><a>Templates</a></div>
                    <div className={menuActive==2? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(2);navigate('/dashboard/universitysupervisor') }}><a>University Supervisor</a></div>
                    <div className={menuActive==5? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(5);navigate('/dashboard/internships') }}><a>Internships</a></div>
                    </>
                ) : (
                    <>
                    <div className="menuPart active" onClick={() => { navigate('/dashboard/documents') }}><a>Documents</a></div>
                    <div className="menuPart" onClick={() => { navigate('/dashboard/internshipdiary') }}><a>Internship Diary</a></div>
                    <div className="menuPart" onClick={() => { navigate('/dashboard/profile') }}><a>Profile</a></div>
                    <div className={menuActive==3? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(3);navigate('/dashboard/documents') }}><a>Documents</a></div>
                    {/* <div className="menuPart"><a>Part 2</a></div>
                    <div className="menuPart"><a>Part 3</a></div> */}
                    </>
                )}
                    <div className={menuActive==4? "menuPart active" : "menuPart"} onClick={() => { setMenuActive(4);navigate('/dashboard/profile') }}><a>Profile</a></div>
                </div>
            </div>
           q
        </div>
    );
}

export default Menu;