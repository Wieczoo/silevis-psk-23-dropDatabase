
import logo from "../assets/logo/logotyp-weaii-psk-1024x270.png";
import pl_icon from "../assets/icons/poland.png";
import en_icon from "../assets/icons/uk.png";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Navbar = ({userType}) => {

    const navigate = useNavigate();
    console.log(userType);

    const SignOut = () =>{
        localStorage.removeItem("user");
        navigate('/login');
    }

    const changeLang = () =>{
        console.log('change');
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
                        <img src={pl_icon} alt="polish"/>
                        <img src={en_icon} alt="english"/>
                    </div>
                    <button id="signout" onClick={SignOut}>Sign Out</button>
                </div>
                
            </div>
        </div>
        <Menu userType={userType}/>
       </>
    );   
}

export default Navbar;