
import './style.css';
import { useState, useEffect } from 'react';
import Form from '../../components/Form';
import store    from "../../utils/store";
import axios from 'axios';


import icon_close from '../../assets/icons/close.png';
const DocumentsAppliactionPage = () =>{

    const [optionsView,setOptionsView] = useState(false);
    const [newAppliance,setNewApplince] = useState(true);
    const [applianceView,setApplianceView] = useState(false);
    const [formView, setFormView] = useState(false);
    const [myApplications, setMyApplications] = useState([]);
    const [applicationId, setApplicationId] = useState();

    const [applicationTitle,setApplicationTitle] = useState(false);

    const [refresh, setRefresh] = useState(false);


    const displayOptions = () =>{
        setOptionsView(true);
        setApplianceView(false);
    }
    const closeOptionsView = () =>{
        setOptionsView(false);
        setApplianceView(true);    
    }
    const displayApplications = () =>{
        setNewApplince(false);
        setOptionsView(false);
        setApplianceView(true);
        setRefresh(true);
    }

    const openForm = (id) => {
        setApplicationId(id);
        setFormView(true);
        
    }
    const closeForm = () =>{
        setFormView(false);
    }

  

    const applyApplication = (type) =>{


        const user = JSON.parse(localStorage.getItem("user"));


        axios.post('http://10.5.5.188:3001/api/internship',{
            student:{
                name: user.firstName,
                surname: user.lastName,
                index : user.studentNumber
            },
            applianceType:type

        })
        .then(function(response){
                console.log(response.data);
                
        }).catch(function(error){console.log(error)});

    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        axios.get('http://10.5.5.188:3001/api/internship/index/'+user.studentNumber,)
        .then((response)=>{
            console.log(response.data);
            setMyApplications(response.data);
            setRefresh(false);
        })
        .catch(function(error){console.log(error)});
    },[refresh])

    return(
        <>
        <store.Provider
        value={{
            closeForm,
            }}>

            <div className="content">
                <h2 className="pageTitle">Appliaction</h2>


                <div id='myAppliances'>
                {myApplications && myApplications.map((item,index)=>{
                    return(
                        <>
                        <div key={index}className='application'>
                            <div className='title'>Title</div>
                            <div id='container'>
                                <a>Wymagane dokumenty:</a>
                                <div className='doc'>
                                    <p onClick={()=>{openForm(item._id)}}>Wniosek</p>
                                    <div className='status'><input type='checkbox'/></div>
                                </div>

                                <div className='doc'>
                                    <a>Wniosek</a>
                                    <div className='status'><input type='checkbox'/></div>
                                </div>
                            </div>
                        </div>
                        </>
                    );
                })}
                {newAppliance && <div className='application' id="newApplication" onClick={displayOptions}>
                    
                    {optionsView ? (
                        <div id='optionsView'>
                            <img id='close' src={icon_close} alt="" onClick={()=>{closeOptionsView()}}/>
                            <div onClick={() => { displayApplications(1); applyApplication(1) }}>Podanie o praktyki</div>
                            <div onClick={() => { displayApplications(2); applyApplication(2) }}>Podanie o zaliczenie</div>
                        </div>
                        ) : (
                        <p>+</p>
                    )}
                </div>}
                </div>
                {/* {applianceView &&
                    <div className='application'>
                        <div className='title'>Title</div>
                        <div id='container'>
                            <a>Wymagane dokumenty:</a>
                            <div className='doc'>
                                <a onClick={()=>{openForm()}}>Wniosek</a>
                                <div className='status'><input type='checkbox'/></div>
                            </div>

                            <div className='doc'>
                                <a>Wniosek</a>
                                <div className='status'><input type='checkbox'/></div>
                            </div>
                        </div>
                    </div>
                } */}


            </div>
            {formView && <Form applicationID={applicationId}/>}
            </store.Provider>
        </>
    );
}

export default DocumentsAppliactionPage;