import text from '../../language/language.json';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import logo from '../../assets/logo/logotyp-weaii-psk-1024x270.png';

const LoginPage = ({language}) =>{

    const navigate = useNavigate();
    const [data,setData] = useState("");

    const LoginUser = () =>{
        
        axios.get("user/s011111%40student.tu.kielce.pl",
        {responseType: "json"})
        .then((response) => {
            console.log(response.data);
            setData(response);
            navigate('/dashboard',{user:data});
        })
        .catch((err) => console.log(err));
    }

    return (
        <>
            <div id="navbar">
                <div className="content">
                    <div id="logo">
                        <img id="logo" src={logo} alt="logo"/>
                    </div>
                </div>
            </div>
            <button onClick={()=>{LoginUser();}}>{text[language].Login} Student</button>
            
            <button>{text[language].Login} Wykładowca</button>

            {/* {data && data} */} 


        </>
       
    );
}

export default LoginPage;
