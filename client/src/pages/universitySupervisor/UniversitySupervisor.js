import { useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const UniversitySupervisor = () =>{
    const navigate = useNavigate();
    const [data,setData] = useState();
    const [isEdit,setIsEdit] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
    const [currentId,setCurrentId] = useState("");
    useEffect(()=>{
        axios.get("http://10.5.5.188:3001/api/universitysupervisor",
        {responseType: "json"})
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        })
        .catch((err) => console.log(err));
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const addNewUniSupervisor = () =>{
        axios.post('http://10.5.5.188:3001/api/universitysupervisor',formData);
        debugger;
      }

      const removeUniSupervisor = (id) =>{
        axios.delete('http://10.5.5.188:3001/api/universitysupervisor/'+id)
      }

      const saveEdit = () => {
        axios.patch('http://10.5.5.188:3001/api/universitysupervisor/'+currentId,formData)
        debugger;
      }
    
     
      const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        tel: ''
      });

    return(
        <>
        <>
        <h2>University Supervisor   <button onClick={() => {
                    setIsAdd(true);
                    setIsEdit(false)
               }}>Add new</button><button onClick={() => {
                setIsAdd(false);
                setIsEdit(false)
           }}>Back</button></h2>
        {(data && !isEdit && !isAdd) && 
        <a>{data.map(entry => (
            <div className="supervisorDataRow" key={entry.email}>
                <div>
                    <p>Name: {entry.name} {entry.surname}</p>
                    <p>Email: <a href={'tel:'+entry.email}>{entry.email}</a></p>
                    <p>Tel: <a href={'tel:'+entry.tel}>{entry.tel}</a></p>
                </div>
               <>
               <button onClick={() => {
                    setCurrentId(entry._id);
                    formData.name =entry.name;
                    formData.surname =entry.surname;
                    formData.email =entry.email;
                    formData.tel =entry.tel;
                    setIsEdit(true);
                    setIsAdd(false)
               }}>Edit</button>
               </>
               <>
               <button onClick={() =>{removeUniSupervisor(entry._id)}}>Remove</button>
               </>
            </div>
          ))}</a>
        }
        </>
        <>{isEdit &&
         <form >
         <label>
           Name:
           <input type="text" name="name" value={formData.name} onChange={handleChange} />
         </label>
         <br />
         <label>
           Surname:
           <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
         </label>
         <br />
         <label>
           Email:
           <input type="text" name="email" value={formData.email} onChange={handleChange} />
         </label>
         <br />
         <label>
           Tel:
           <input type="text" name="tel" value={formData.tel} onChange={handleChange} />
         </label>
         <br />
         <button onClick={()=>{saveEdit()}}>Save changes</button>
       </form>
        }


        </>
        <>
            {isAdd &&  <form >
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Surname:
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Tel:
            <input type="text" name="tel" value={formData.tel} onChange={handleChange} />
          </label>
          <br />
          <button onClick={addNewUniSupervisor} >Save</button>
        </form>}
        </>
        </>
       


    );
}


export default UniversitySupervisor;