import { useState } from "react";
import {useNavigate} from 'react-router-dom';


const Menu = () =>{

    const navigate = useNavigate();

    const [active, setActive] = useState();
    return(
        <div id="menuLine">
            <div className="content">
                <div id="menu">
                    <div class="menuPart active" onClick={()=>{navigate('/dashboard/documents')}}><a>Documents</a></div>
                    <div class="menuPart"><a>Part 2</a></div>
                    <div class="menuPart"><a>Part 3</a></div>
                    <div class="menuPart" onClick={()=>{navigate('/dashboard/profile')}}><a>Profile</a></div>
                </div>
            </div>
           
        </div>
    );
}

export default Menu;