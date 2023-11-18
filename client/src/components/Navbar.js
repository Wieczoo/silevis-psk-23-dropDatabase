
import logo from "../assets/logo/logotyp-weaii-psk-1024x270.png";

import Menu from "./Menu";
const Navbar = ({userType}) => {

    console.log(userType);

    return(
<>
        <div id="navbar">
            <div className="content">
                <div id="logo">
                    <img id="logo" src={logo} alt="logo"/>
                </div>
            </div>
        </div>
        <Menu userType={userType}/>
       </>
    );   
}

export default Navbar;