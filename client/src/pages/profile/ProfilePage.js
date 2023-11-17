import { useEffect, useState} from "react";
import axios from "axios";

const ProfilePage = () =>{

    const [data,setData] = useState();

    useEffect(()=>{
        axios.get("http://hackathon23-mockapi-env.eba-qfrnjqkt.eu-central-1.elasticbeanstalk.com/user/s011111%40student.tu.kielce.pl",
        {responseType: "json"})
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        })
        .catch((err) => console.log(err));
    },[])

    return(
        <>
        <h2>Profil</h2>
        {data && 
        <a>{data.firstName}</a>
        }
        </>
       


    );
}


export default ProfilePage;