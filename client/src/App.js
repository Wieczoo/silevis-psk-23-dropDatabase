
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import DocumentsTemplates from './pages/documentsTemplates/DocumentsTemplates';
import UniversitySupervisor from './pages/universitySupervisor/UniversitySupervisor';
import DocumentsTexts from './pages/documentTexts/documentsTexts';
import DocumentsAppliactionPage from './pages/documentsApplication/DocumentsApplication';
import './styles/main.css';
import { useEffect } from 'react';
const App = () =>{


    // useEffect(()=>{
    //     if (localStorage.getItem("lang") === null) {
    //         const defaultLang={
    //             lang:"pl"
    //         }
    //         localStorage.setItem(defaultLang);
    //     }
       
    // },[])



    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage language="en"/>}/>
                <Route path="/dashboard" element={<DashboardPage language="en"/>}>
                    <Route path='templates' element={<DocumentsTemplates/>}/>
                    <Route path='documents' element={<DocumentsAppliactionPage/>}/>
                    <Route path='profile' element={<ProfilePage/>}/>
                    <Route path='universitysupervisor' element={<UniversitySupervisor/>}/>
                    <Route path='documentstexts' element={<DocumentsTexts/>}/>
                </Route>
               


                {/* <Route path='*' element={}/> */}
            </Routes>
        </BrowserRouter>

    );

}

export default App;