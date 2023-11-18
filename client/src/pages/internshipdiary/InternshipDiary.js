import { useEffect, useState} from "react";
import axios from "axios";

import "./style.css";

const InternshipDiary = () =>{
    const [data,setData] = useState();
    const [formData,setFormData] = useState();
    const [diary,setDiary] = useState();
    const [Id,setId] = useState();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        
        axios.get("http://10.5.5.188:3001/api/internshipdiary/index/"+user.studentNumber)
        .then((response) => {
console.log(response.data);
            setId(response.data[0]._id);

            setData(response.data[0]);
            setDiary(response.data[0].diary);
        })
        .catch((err) => console.log(err));
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const addNewDate = () => {
        const user = JSON.parse(localStorage.getItem('user'));
  
        // Skopiuj istniejące wpisy z tablicy diary do diaryList
        const diaryList = [...diary];
        
        // Dodaj nowy wpis do diaryList
        diaryList.push({"day": formData.day, "description": formData.description});
       axios.patch("http://10.5.5.188:3001/api/internshipdiary/"+Id,{"index":user.studentNumber,"diary":diaryList } )
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
        {diary && diary.map((item) => (
  <tr key={item.day}>
    <td>{item.day}</td>
    <td>{item.description}</td>
  </tr>
))}
        </tbody>
       </table>
        <div>
            <label>Date : </label>
             <input name='day'  onChange={handleChange} type="date" className="inpucik"></input>
             <br></br>
             <label>Discription</label>

            <textarea name='day'  onChange={handleChange} type="text" className="inpucik">Discription </textarea>

           
            <button onClick={()=>{addNewDate()}} type="text">Add </button>
        </div>
       </div>
    );
}


export default InternshipDiary;