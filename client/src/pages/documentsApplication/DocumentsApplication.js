
import './style.css';
import { useState } from 'react';
import Form from '../../components/Form';
const DocumentsAppliactionPage = () =>{

    const [optionsView,setOptionsView] = useState(false);
    const [newAppliance,setNewApplince] = useState(true);
    const [applianceView,setApplianceView] = useState(false);
    const [formView, setFormView] = useState(false);

    const [applicationTitle,setApplicationTitle] = useState(false);


    const displayOptions = () =>{
        setNewApplince(false);
        setOptionsView(true);
        setApplianceView(false);
    }
    const displayApplications = () =>{
        setNewApplince(false);
        setOptionsView(false);
        setApplianceView(true);
    }

    const openForm = () => {
        setFormView(true);
    }

    return(
        <>
            <div className="content">
                <h2 className="pageTitle">Appliaction</h2>
                {newAppliance && <div id="newApplication" onClick={displayOptions}>+</div>}

                {optionsView && 
                <div id='optionsView'>
                    <div onClick={()=>{displayApplications(1)}}>Podanie o praktyki</div>
                    <div onClick={()=>{displayApplications(2)}}>Podanie o zaliczenie</div>
                    
                </div>
                }

                {applianceView &&
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
                }


            </div>
            {formView && <Form/>}

        </>
    );
}

export default DocumentsAppliactionPage;