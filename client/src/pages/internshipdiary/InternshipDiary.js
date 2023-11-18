import { useEffect, useState} from "react";
import axios from "axios";

const InternshipDiary = () =>{
    const [data,setData] = useState();
    const [formData,setFormData] = useState();
    
    useEffect(()=>{
        const studentNumber = JSON.parse(localStorage.getItem('user'));
        
        axios.get("http://10.5.5.188:3001/api/internshipdiary/index/22222")
        .then((response) => {

            setData(response.data[0]);
        })
        .catch((err) => console.log(err));
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const addNewDate = () => {

      }
      

    return(
       <div className="content">
       <table>
        <thead>
            <tr>
                <td>Date</td><td>Description</td>
            </tr>
        </thead>
        <tbody>
                {data && data.diary.map((item)=>{
                    <tr>
                    <td>{item.day}</td><td>{item.description}</td>
                </tr>
                })}
        </tbody>
       </table>
        <div>
            <label>Date</label>
             <input name='day'  onChange={handleChange} type="date"></input>
             <br></br>
             <label>Discription</label>
            <textarea name='day'  onChange={handleChange} type="text">Discription </textarea>
            <button onClick={()=>{addNewDate()}} type="text">Add </button>
        </div>
       </div>
       


    );
}


export default InternshipDiary;