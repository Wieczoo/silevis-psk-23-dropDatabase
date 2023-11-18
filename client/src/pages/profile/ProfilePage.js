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
         <div className="content">
                <h2 className="pageTitle">User Profile</h2>
                <div id="userData">
                    {data && 
                    <>
                        <a>Firstname: {data.firstName}</a><br></br>
                        <a>Lastname: {data.lastName}</a><br></br>
                        <a>Role: {data.staffStatus!=2 ? "Student" : "Pracownik Uczelni"}</a><br></br>
                    </>}
                    </div>
            
            
        </div>
       
        
        </>
       


    );
}


export default ProfilePage;