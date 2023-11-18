
import './style.css';
import { useState, useEffect } from 'react';
import Form from '../../components/Form';
import store    from "../../utils/store";
import axios from 'axios';


import icon_close from '../../assets/icons/close.png';
import icon_trash from '../../assets/icons/bin.png';
import icon_possitive from "../../assets/icons/check.png";
import icon_download from "../../assets/icons/download.png";

const DocumentsAppliactionPage = () =>{

    const [optionsView,setOptionsView] = useState(false);
    const [newAppliance,setNewApplince] = useState(true);
    const [applianceView,setApplianceView] = useState(false);
    const [formView, setFormView] = useState(false);
    const [myApplications, setMyApplications] = useState([]);
    const [applicationId, setApplicationId] = useState();
    const [applcationDocumentTitle, setApplcationDocumentTitle] = useState([]);

    const [applicationTitle,setApplicationTitle] = useState(false);
    const [applicationType, setApplicationType] = useState();

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
        setApplianceView(false);
        setRefresh(true);
    }

    const openForm = (id,x,title) => {
        setApplicationId(id);
        setApplcationDocumentTitle(title.docTitle);
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

        // axios.get('http://10.5.5.188:3001/api/documentstemplates')
        // .then((response) =>{
        //     console.log(response.data);
        //     setApplicationType(response.data);
        // }).catch(function(error){console.log(error)});
    },[refresh]);

    const DeleteApplication = (id) =>{
        axios.delete('http://10.5.5.188:3001/api/internship/'+id)
        .then(function(response){console.log(response.data);setRefresh(true)})
        .catch(function(error){console.log(error)});
    }

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
                            <div className='title'>{item.applianceType==1 ? "Podanie o Praktyki": "Podanie o Zaliczenie"}
                                <img className="delete" src={icon_trash} alt="" onClick={()=>{DeleteApplication(item._id);}}/>
                            </div>
                            <div id='container'>
                                <a>Wymagane dokumenty:</a>
                                {item.form1.map((item,index)=>{
                                    return(
                                        <div className='doc' key={index}>
                                                <p onClick={()=>{openForm(item._id,item.applianceType,item)}}>{item.docTitle}</p>
                                                <div className='status'>
                                                    <img src={icon_possitive} alt="possitive"/>
                                                    <img src={icon_download} alt="possitive"/>
                                                    
                                                    </div>
                                            </div>
                                    );
                                })}
                                {/* {applicationType[item.applianceType-1].textOrder.map((item2,index)=>{
                                        return(
                                            <div className='doc' key={index}>
                                                <p onClick={()=>{openForm(item._id,item.applianceType,item2)}}>{item2}</p>
                                                <div className='status'>
                                                    <img src={icon_possitive} alt="possitive"/>
                                                    <img src={icon_download} alt="possitive"/>
                                                    
                                                    </div>
                                            </div>
                                        );
                                })} */}
                            </div>
                        </div>
                        </>
                    );
                })}
                {newAppliance && <div className='application' id="newApplication" onClick={displayOptions}>
                    
                    {optionsView ? (
                        <div id='optionsView'>
                            <img id='close' src={icon_close} alt="" onClick={()=>{closeOptionsView(); setOptionsView(false);}}/>
                            <div onClick={() => { displayApplications(1); applyApplication(1) }}>Podanie o praktyki</div>
                            <div onClick={() => { displayApplications(2); applyApplication(2) }}>Podanie o zaliczenie</div>
                        </div>
                        ) : (
                        <p>+</p>
                    )}
                </div>}
                </div>
            </div>
            {formView && <Form applicationID={applicationId} Title={applcationDocumentTitle}/>}
            </store.Provider>
        </>
    );
}

export default DocumentsAppliactionPage;