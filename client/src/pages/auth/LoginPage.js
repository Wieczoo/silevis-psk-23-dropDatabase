import text from '../../language/language.json';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import logo from '../../assets/logo/logotyp-weaii-psk-1024x270.png';


import "./style.css";


const LoginPage = ({language}) =>{

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const SignInUser = (event) =>{
        event.preventDefault();
        axios.get("/user/" + email,
        {responseType: "json"})
        .then((response) => {
            console.log(response.data);
            if(response.data.email===email)
            {
                localStorage.setItem('user',JSON.stringify(response.data));

                navigate('/dashboard',{ state: { status: response.data.staffStatus} });
            }
            else
            {
                setError("User not found!");
            }
        })
        .catch((err) => {console.log(err);setError("User not found!");});
    };

    return (
        <>
            <div id="navbar">
                <div className="content">
                    <div id="logo">
                        <img id="logo" src={logo} alt="logo"/>
                    </div>
                </div>
            </div>
            <form id='loginForm' onSubmit={SignInUser}>
                <h2 id='loginh2'>{text[language].Login}</h2>
                <label>Email adress:</label>
                <input type='email' required onChange={(e)=>{setEmail(e.target.value)}}></input>
                <button type='submit' id='submit'>{text[language].Login}</button>
                {error && error}
            </form>
           

            {/* {data && data} */} 


        </>
       
    );
}

export default LoginPage;
