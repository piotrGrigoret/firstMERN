
import './Registration.css';
import React, { useState} from 'react';
import axios from 'axios';

const Registration = (props) => {
    const defaultUserObj = 
        {
            login: "",
            password:"",
            name:"",
            phone:"",
            theme:"light",
            _id:""
        }     
    
    // console.log(defaultUserObj); 
    const [userObj, setUserObj] = useState(defaultUserObj);
    const [values1, setValues1] = useState("");
    const [values2, setValues2] = useState("");
    const [values3, setValues3] = useState("");
    const [values4, setValues4] = useState("");
    
    const [showPassword, setShowPassword] = useState("password");
    const [resistrationAutorization, setResistrationAutorization] = useState(true);

    const [checkLoginError, setCheckLoginError] = useState(false);
    const [checkPasswordError, setCheckPasswordError] = useState(false);
   
    const onLoginChangheHandler = (event) => {
        const userObjCpy = {...userObj};
        userObjCpy.login = event.target.value;
        // console.log(userObjCpy);
        setUserObj(userObjCpy);
        setValues1(event.target.value);

    };

    const onPasswordChangheHandler = (event) => {
        
        const userObjCpy = {...userObj};
        userObjCpy.password = event.target.value;
        setUserObj(userObjCpy);
        setValues2(event.target.value);
    };
    const onNameChangheHandler = (event) => {
        
        const userObjCpy = {...userObj};
        userObjCpy.name = event.target.value;
        setValues3(event.target.value);
        
        setUserObj(userObjCpy);
    };
    const onPhoneChangheHandler = (event) => {
        
        const userObjCpy = {...userObj};
        userObjCpy.phone = event.target.value;
        setUserObj(userObjCpy);
        setValues4(event.target.value);

    };
    const submitObjHandler = async() => {
        console.log(userObj);
        setValues1("");
        setValues2("");
        setValues3("");
        setValues4("");
        
        await axios.post("https://first-mern-test.onrender.com/adduser", {user: userObj});
    };

    const changheShowPasswordHandler = () => {
        if(showPassword == "password"){
            setShowPassword("text");
        }
        else{
            setShowPassword("password");
        }
    };
    const changheResistrationAutorizationHandler = () =>{
        if(resistrationAutorization == true){
           setResistrationAutorization(false);
        }
        else{
           setResistrationAutorization(true);
        }
    }

    const onCheckVerification = async () => {
        
        const response = await axios.post('https://first-mern-test.onrender.com/userverification', {user: userObj});
        // console.log(response.data);

        if(response.data.length !== 0){
            const responseObj = response.data[0];
            // console.log(responseObj.login);
            if(responseObj.password == userObj.password){
                props.setValidation(true);
            }
            else{
                console.log("password False");
                setCheckPasswordError(true);
                setCheckLoginError(false);

            }
        }
        else{
            setCheckLoginError(true);
            setCheckPasswordError(false);

        };
        const objTransmis = {
            login: response.data[0].login,
            _id: response.data[0]._id
        }

        props.setUser(objTransmis);

    }
    
    return(
     
        <>
        {resistrationAutorization ?
            <div className="container">
                
                <div className="inputsContainer">
                
                    <div className='pustashka'>
                    {checkLoginError &&
                        <div className='errorBox'>Ошбика - такого логина не существует</div>
                    }
                    {checkPasswordError &&
                        <div className='errorBox'>Ошибка! этот пароль не верен</div>
                    }
                    </div>
                    <input onChange={onLoginChangheHandler} className='registrationInput'  type="text" placeholder="Login" value={values1} />
                    <input onChange={onPasswordChangheHandler} className='registrationInput' type={showPassword} placeholder="Password" value={values2} /><span className='showPasswordBlock' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></span>
                    <button onClick={onCheckVerification} className="submitButton">Log in</button>
                </div>
                <div className='undText'>Do you have not an account? <span onClick={changheResistrationAutorizationHandler} className='linkToRegstr'>Registration </span> </div>
            </div>

        :
            <div className="container2">
                <div className="inputsContainer">
                    <div className='pustashka'>Registration</div>
                    <input onChange={onNameChangheHandler} className='registrationInput'  type="text" placeholder="Name" value={values3} />
                    <input onChange={onPhoneChangheHandler} className='registrationInput'  type="text" placeholder="Phone Number" value={values4} />
                    <input onChange={onLoginChangheHandler} className='registrationInput'  type="text" placeholder="Login" value={values1} />
                    <input onChange={onPasswordChangheHandler} className='registrationInput' type={showPassword} placeholder="Password" value={values2} /><span className='showPasswordBlock' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></span>
                    <button onClick={submitObjHandler} className="submitButton">Submit</button>
                </div>
                <div className='undText'>Do you already have an account? <span onClick={changheResistrationAutorizationHandler} className='linkToRegstr'>Authorization </span> </div>
            </div>
        }
        </>
    
    );
};


export default Registration;

