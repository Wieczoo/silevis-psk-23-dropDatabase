

import text from '../language/language.json';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
            <button onClick={()=>{LoginUser();}}>{text[language].Login} Student</button>
            
            <button>{text[language].Login} Wykładowca</button>

            {/* {data && data} */} 


        </>
       
    );
}

export default LoginPage;
