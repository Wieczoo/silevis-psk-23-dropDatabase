
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';

import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import DocumentsTemplates from './pages/documentsTemplates/DocumentsTemplates';
import UniversitySupervisor from './pages/universitySupervisor/UniversitySupervisor';
import DocumentsTexts from './pages/documentTexts/documentsTexts';
import DocumentsAppliactionPage from './pages/documentsApplication/DocumentsApplication';

import Internships from './pages/internships/Internships';

import InternshipDiary from './pages/internshipdiary/InternshipDiary';
import './styles/main.css';

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
                    <Route path='internships' element={<Internships/>}/>
                    <Route path='documentstexts' element={<DocumentsTexts/>}/>
                    <Route path='internshipdiary' element={<InternshipDiary/>}/>
                </Route>
               


                {/* <Route path='*' element={}/> */}
            </Routes>
        </BrowserRouter>

    );

}

export default App;