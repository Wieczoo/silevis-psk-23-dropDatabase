
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

import DocumentsAppliactionPage from './pages/documentsApplication/DocumentsApplication';
import './styles/main.css';
const App = () =>{



    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="" element={<LoginPage language="en"/>}/>
                <Route path="/dashboard" element={<DashboardPage language="en"/>}>
                    <Route path='documents' element={<DocumentsAppliactionPage/>}/>
                </Route>


                {/* <Route path='*' element={}/> */}
            </Routes>
        </BrowserRouter>

    );

}

export default App;