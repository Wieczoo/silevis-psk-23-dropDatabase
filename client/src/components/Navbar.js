
import logo from "../assets/logo/logotyp-weaii-psk-1024x270.png";
import pl_icon from "../assets/icons/poland.png";
import en_icon from "../assets/icons/uk.png";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const translations = {
  pl: {
    Login: "Zaloguj!",
    SignOut: "Wyloguj się",
    Documents: "Dokumenty",
    Profile: "Mój Profil"
  },
  en: {
    Login: "Sign In!",
    SignOut: "Sign Out",
    Documents: "Documents",
    Profile: "Profile"
  }
};



const Navbar = ({userType}) => {

    const navigate = useNavigate();
    console.log(userType);

    const SignOut = () =>{
        localStorage.removeItem("user");
        navigate('/login');
    }

    const [login,setLogin] = useState("Sign Out");

    const changeLang = (lang) =>{
        console.log('change' + lang);
        localStorage.setItem('lang',lang)
        if(lang == 'pl'){
            setLogin("Wyloguj się")
        } else {
            setLogin("Sign Out")
        }
    }


  

    return(
<>
<div id="navbar">
            <div className="content">
                <div id="logo">
                    <img id="logo" src={logo} alt="logo"/>
                </div>
                <div id="rightSide">
                    <div id="langOptions">
                        <img onClick={()=>{changeLang('pl')}} src={pl_icon} alt="polish"/>
                        <img onClick={()=>{changeLang('en')}} src={en_icon} alt="english"/>
                    </div>
                    <button id="signout" onClick={SignOut}>{login}</button>
                </div>
                
            </div>
        </div>
        <Menu userType={userType}/>

        
       </>
    );   
}

export default Navbar;