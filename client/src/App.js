import { useState } from "react";
import Main from "./pages/Main"
import Registration from "./pages/Registration";


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './components/Layout';

const App = () => {
    const [registrationalidation, setRegistrationValidation] = useState(false);
    
    const userData = localStorage.getItem('user'); 
    const themeSotrage = localStorage.getItem('theme');
    const [userInAcc, setUserInAcc] = useState(JSON.parse(userData));
    // console.log(userData);
    return(
        <>
        {registrationalidation || userData
            ?
                <Main
                    userIn = {userInAcc}
                    setValidation = {setRegistrationValidation}
                />
            :
                <Registration
                    setUser = {setUserInAcc}
                    setValidation = {setRegistrationValidation}
                />
        }  
           
         
        </>
    )


}


export default App



