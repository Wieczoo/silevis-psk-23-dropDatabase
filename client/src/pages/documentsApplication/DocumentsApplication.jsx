
import './style.css';
import { useState } from 'react';
const DocumentsAppliactionPage = () =>{

    const [optionsView,setOptionsView] = useState(false);


    const displayOptions = () =>{
        setOptionsView(true);
    }

    return(
        <>
            <div className="content">
                <h2 className="pageTitle">Appliaction</h2>
                <div id="newApplication" onClick={displayOptions}>+</div>

                {optionsView && 
                <div id='optionsView'>
                    <div>Podanie o zaliczenie</div>
                    <div>Podanie o praktyki</div>
                </div>
                }


            </div>

        </>
    );
}

export default DocumentsAppliactionPage;