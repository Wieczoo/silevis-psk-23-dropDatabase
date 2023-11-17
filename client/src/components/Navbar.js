
import logo from "../assets/logotyp-weaii-psk-1024x270.png";

import Menu from "./Menu";
const Navbar = ({data}) => {

    console.log(data);

    return(
<>
        <div id="navbar">
            <div className="content">
                <div id="logo">
                    <img id="logo" src={logo}/>
                </div>
            </div>
        </div>
        <Menu/>
       </>
    );   
}

export default Navbar;