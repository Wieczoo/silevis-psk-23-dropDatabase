import { useEffect, useState} from "react";
import axios from "axios";

const DocumentsTexts = () =>{
    const [data,setData] = useState();
    const [isEdit,setIsEdit] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
    const [currentId,setCurrentId] = useState("");
    useEffect(()=>{
        axios.get("http://10.5.5.188:3001/api/documentstext",
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
        axios.post('http://10.5.5.188:3001/api/documentstext',handleSave());
        debugger;
      }

      const removeUniSupervisor = (id) =>{
        axios.delete('http://10.5.5.188:3001/api/documentstext/'+id)
      }

      const saveEdit = () => {
        axios.patch('http://10.5.5.188:3001/api/documentstext/'+currentId,formData)
        debugger;
      }
    
      const [formData, setFormData] = useState({
        title: '',
        pl: '',
        en: ''
      });
      const handleSave = () => {
        return {
          title: formData.title,
          documentStaticText: {
            en: formData.en,
            pl: formData.pl
          }
        };
      };
    

    return(
        <>
        <>
        <h2>Translations   <button onClick={() => {
                    setIsAdd(true);
                    setIsEdit(false)
               }}>Add new</button>
              {(isEdit || isAdd) &&
                        <button onClick={() => {
                            setIsAdd(false);
                            setIsEdit(false)
                        }}>Back</button>
              } 
              
           
           </h2>
        {(data && !isEdit && !isAdd) && 
        <a>{data.map(entry => (
            <div className="supervisorDataRow" key={entry.email}>
                <div>
                    <p>Title: {entry.title}</p>
                    <p>polish: {entry.documentStaticText.pl}</p>
                    <p>english: {entry.documentStaticText.en}</p>
                </div>
               <>
               <button onClick={() => {
                    setCurrentId(entry._id);
                    formData.title =entry.title;
                    formData.pl =entry.documentStaticText.pl;
                    formData.en =entry.documentStaticText.en;
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
           title:
           <input type="text" name="title" value={formData.title} onChange={handleChange} />
         </label>
         <br />
         <label>
           polish:
           <input type="text" name="pl" value={formData.pl} onChange={handleChange} />
         </label>
         <br />
         <label>
           english:
           <input type="text" name="en" value={formData.en} onChange={handleChange} />
         </label>
         <br />
        
         <br />
         <button onClick={()=>{saveEdit()}}>Save changes</button>
       </form>
        }


        </>
        <>
            {isAdd &&  <form >
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <br />
          <label>
            Polish:
            <input type="text" name="pl" value={formData.pl} onChange={handleChange} />
          </label>
          <br />
          <label>
            English:
            <input type="text" name="en" value={formData.en} onChange={handleChange} />
          </label>
         
          <br />
          <button onClick={addNewUniSupervisor} >Save</button>
        </form>}
        </>
        </>
       


    );
}


export default DocumentsTexts;