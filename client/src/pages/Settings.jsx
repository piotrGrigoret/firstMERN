import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./Settings.css"
import { Link } from 'react-router-dom';
export const Settings = (props) => {

    const [setMenuVar, setSetMenuVar] = useState(1);
    
    // console.log(props.user);
   
    const [dbUser, setDBuser] = useState(props.user);
    const [values1, setValues1] = useState(props.user.name);
    const [values2, setValues2] = useState(dbUser.phone);
    const [values3, setValues3] = useState(dbUser.login);
    const [values4, setValues4] = useState(dbUser.password)    
    const [boolProfile, setBoolProfile] = useState(false);
    const [showPassword, setShowPassword] = useState("password");
    const [showPassword2, setShowPassword2] = useState("password");
    
    const changheMenuHandler = (numb) =>{
        setSetMenuVar(numb);
        setBoolProfile(false);
        setSuccesParol(false);
        setErrorParol(false);
    }

    const getInformation = async() =>{
        
        let userId = props.user._id;
        if(!userId){
            const userDataPrim = localStorage.getItem('user');
            const userData = JSON.parse(userDataPrim);
            userId = userData._id;
            // console.log(userId);
    
        }
               const response = await axios.get('https://first-mern-test.onrender.com/user', {
            params:{
            param2: userId,
            }
          
        });

        // console.log(response.data);
        setDBuser(response.data[0]);
        setValues1(response.data[0].name);
        setValues2(response.data[0].phone);
        setValues3(response.data[0].login);
        setValues4(response.data[0].password);

        const themeDataPrim = localStorage.getItem('theme');
        const themeData = JSON.parse(themeDataPrim);
        setChangheClassThemeButton(themeData);

    };
    useEffect(()=>{
        // console.log(props.user);
        getInformation();
    }, []);
    
    const onChangheBoolProfileHandler = () =>{
        if(boolProfile == false){
            setBoolProfile(true);
        }else{
            setBoolProfile(false);

        }
    
    }
    const onChangheNameHandler = (event) => {
        const dbUserChanghe = {...dbUser};
        dbUserChanghe.name = event.target.value;
        setDBuser(dbUserChanghe);
        setValues1(event.target.value);
        console.log(dbUser.name);
    };
    const onChanghePhoneHandler = (event) => {
        const dbUserChanghe = {...dbUser};
        dbUserChanghe.phone = event.target.value;
        setDBuser(dbUserChanghe);
        setValues2(event.target.value);
        console.log(dbUser.phone);

    };
    const onChangheLoginHandler = (event) => {
        const dbUserChanghe = {...dbUser};
        dbUserChanghe.login = event.target.value;
        setDBuser(dbUserChanghe);
        setValues3(event.target.value);
        console.log(dbUser.login);

    };
    const sumbitInfoSettingsHandler = async() => {
        setBoolProfile(false);
        setSuccesParol(true);
        console.log(dbUser);
        await axios.post("https://first-mern-test.onrender.com/changheuser", {updateObj:dbUser});

    };

    const changheShowPasswordHandler = () => {
        if(showPassword == "password"){
            setShowPassword("text");
        }
        else{
            setShowPassword("password");
        }
    };
    const changheShowPasswordHandler2 = () => {
        if(showPassword2 == "password"){
            setShowPassword2("text");
        }
        else{
            setShowPassword2("password");
        }
    };

    const [parolConfirm, setParolConfirm] = useState("");
    const [errorParol, setErrorParol] = useState(false);
    const [succesParol, setSuccesParol] = useState(false);
    const  onChangheParolHandler = (event) =>{
        const object ={...dbUser};
        object.password = event.target.value;
        setDBuser(object);
    }
    const  onChangheParolConfirmHandler = (event) =>{
        setParolConfirm(event.target.value);
    }
    const sumbitParolHandler = async() =>{
        if(dbUser.password !== parolConfirm){
            setErrorParol(true);
            setSuccesParol(false);

        }else{
            setErrorParol(false);
            setSuccesParol(true);
            setBoolProfile(false);
            await axios.post("https://first-mern-test.onrender.com/reductpassword", {password:dbUser});
        }
    }

    const changheThemeHandler = async(themeColor) => {
        if(themeColor == "light"){  
            const lightObj = {...props.objChangheTh};
            lightObj.obiortka = "obiortkaMain";
            lightObj.main = "main";
            lightObj.razdel = "razdel";
            lightObj.dela = "textDEL";
            lightObj.vodTexta = "vvvodTexta";
            lightObj.dobavlenie = "dobavlenie";
            lightObj.redactirovanie = "redactirovanie";
            lightObj.udalenie = "udalenie";
            lightObj.userBox = "userBox";
            lightObj.obiortkaSettings = "obiortkaSettings";
            lightObj.titlePage = "titlePage";
            lightObj.titlePageTheme = "titlePageTheme";
            lightObj.rowSettings = "rowSettings";
            lightObj.rowSettingsTitle = "rowSettingsTitle";
            lightObj.title = "title";
            
            setChangheClassThemeButton("light");
            props.setChThemeObj(lightObj);
        
            const dbUserCopy = {...dbUser};
            dbUserCopy.theme = "light";
            // console.log(dbUserCopy);
            setDBuser(dbUserCopy);

            await axios.post("https://first-mern-test.onrender.com/changheuser", {updateObj:dbUserCopy});

        }else{
            const darkObj = {...props.objChangheTh};
            darkObj.obiortka = "obiortkaMainBlack";
            darkObj.main = "mainBlack";
            darkObj.razdel = "razdelDark";
            darkObj.dela = "textDELDark";
            darkObj.vodTexta = "vvvodTextaDark";
            darkObj.dobavlenie = "dobavlenieDark";
            darkObj.redactirovanie= "redactirovanieDark";
            darkObj.udalenie = "udalenieDark";
            darkObj.userBox = "userBoxDark";
            darkObj.obiortkaSettings = "obiortkaSettingsDark";
            darkObj.titlePage = "titlePageDark";
            darkObj.titlePageTheme = "titlePageThemeDark";
            darkObj.rowSettings = "rowSettingsDark";
            darkObj.rowSettingsTitle = "rowSettingsTitleDark";
            darkObj.title = "titleDark";

            setChangheClassThemeButton("dark");
            props.setChThemeObj(darkObj);
        
            const dbUserCopy = {...dbUser};
            dbUserCopy.theme = "dark";
            // console.log(dbUserCopy);
            setDBuser(dbUserCopy);

            await axios.post("https://first-mern-test.onrender.com/changheuser", {updateObj:dbUserCopy});
        }
    }
    // const [changheClassThemeButton, setChangheClassThemeButton] = useState(dbUser.theme == "light" ? false : true);
    const [changheClassThemeButton, setChangheClassThemeButton] = useState("");
    // console.log(changheClassThemeButton);
    return (
        <div className={props.objChangheTh.obiortkaSettings}>
            <div className="sidenav">
                <div onClick={() => changheMenuHandler(1)}>Профиль</div>
                <div onClick={() => changheMenuHandler(2)}>Пароль</div>
                <div onClick={() => changheMenuHandler(3)}>Другие настройки</div>
                <Link to="/" style={{ textDecoration: 'none' }}><div>Назад</div></Link>
            </div>

            <div className="mainSetting">
                {setMenuVar == 1 
                &&
                    <div className='boxProfile'>
                    <div className={props.objChangheTh.titlePage}>Настройки профиля</div>
                        <div><img onClick={onChangheBoolProfileHandler} className='imageSet' src="/check.png" alt="" /></div>
                        {!boolProfile ?
                        <>

                        <div className='settingsProfileBox'>
                        {succesParol ? <div className='succesBoxPaswordSet'>Изменения успешно внесены</div> :<div className='pustouBlok'></div>}

                           <div className="rowSettings"><span className={props.objChangheTh.rowSettingsTitle}>Имя</span> <input disabled type="text" className='settingInput' value={values1} /></div>
                           <div className='rowSettings'><span className={props.objChangheTh.rowSettingsTitle}>Телефон</span><input disabled type="text" className='settingInput' value={values2} /></div>
                           <div className='rowSettings'><span className={props.objChangheTh.rowSettingsTitle}>Логин</span> <input disabled type="text" className='settingInput' value={values3} /></div>
                        </div>
                        <button disabled className="submitButtonSettingsDisable">ПОДТВЕРДИТЬ</button>
                        </>
                        :
                        <>
                        <div className='settingsProfileBox'>
                           <div className='rowSettings'><span className={props.objChangheTh.rowSettingsTitle}>Имя</span> <input onChange={onChangheNameHandler}  type="text" className='settingInput' value={values1} /></div>
                           <div className='rowSettings'><span className={props.objChangheTh.rowSettingsTitle}>Телефон</span><input onChange={onChanghePhoneHandler}  type="text" className='settingInput' value={values2} /></div>
                           <div className='rowSettings'><span className={props.objChangheTh.rowSettingsTitle}>Логин</span> <input onChange={onChangheLoginHandler} type="text" className='settingInput' value={values3} /></div>
                        </div>
                        <button onClick={sumbitInfoSettingsHandler} className="submitButtonSettings">ПОДТВЕРДИТЬ</button>
                        </>
                        }
                    </div>
                }
                {setMenuVar == 2 
                &&
                    <div className='boxProfilePassword'>
                        <div className={props.objChangheTh.titlePage}>Смена Пароля</div>
                        <div><img onClick={onChangheBoolProfileHandler} className='imageSet' src="/check.png" alt="" /></div>
                        {!boolProfile ?
                            <>

                            <div className='settingsPasswordBox'>
                                {succesParol ? <div className='succesBoxPaswordSet'>Пароль Успешно Изменен</div> :<div className='pustouBlok'></div>}
                                <div className='rowSettingsPassword'><div className={props.objChangheTh.title}>Пароль</div> <input disabled type="password" className='settingInput' value={values4} /></div>
                                <div className='rowSettingsPassword'><div className={props.objChangheTh.title}>Новый Пароль</div><input disabled type="password" className='settingInput'  /></div>
                                <div className='rowSettingsPassword'><div className={props.objChangheTh.title}>Подтверждение</div> <input disabled type="password" className='settingInput'  /></div>
                            </div>
                            <button disabled className="submitButtonSettingsDisable">ПОДТВЕРДИТЬ</button>
                            </>
                        :
                            <>
                            <div className='settingsPasswordBox'>
                                {errorParol ? <div className = 'errorBoxPaswordSet'>Ошибка! Пароли не совпадают   </div> : <div className='pustouBlok'></div>}
                                <div className='rowSettingsPassword'><div className={props.objChangheTh.title}>Пароль</div><span></span> <input onChange={onChangheNameHandler} disabled type="text" className='settingInput' value={values4} /></div>
                                <div className='rowSettingsPassword'>
                                    <div className={props.objChangheTh.title}>Новый Пароль</div>
                                    <div className='block'>
                                        <input onChange={onChangheParolHandler} placeholder="password" type={showPassword} className='settingInput' />
                                        <span className='showPasswordBlockSet' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></span>
                                    </div>
                                </div>
                                <div className='rowSettingsPassword'>
                                    <div className={props.objChangheTh.title}>Подтверждение</div> 
                                    <div className='block'>
                                        <input onChange={onChangheParolConfirmHandler}placeholder="confirm" type={showPassword2} className='settingInput' />
                                        <span className='showPasswordBlockSet' onClick={changheShowPasswordHandler2}><img className='image' src="/eye.png" alt="" /></span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={sumbitParolHandler} className="submitButtonSettings">ПОДТВЕРДИТЬ</button>
                            </>
                        }
                    </div>
                }
                {setMenuVar == 3 
                && 
                    <div className='themeBox'>
                    <div className={props.objChangheTh.titlePageTheme}>Цветовая тема</div>
                        
                        <div onClick={() => changheThemeHandler("dark")} className={changheClassThemeButton == "dark" ? 'theme1' : 'theme'}><img  src="/night.png" alt="" /></div>
                        <div onClick={() => changheThemeHandler("light")} className={changheClassThemeButton == "light" ? 'theme1' : 'theme'}><img  src="/sun.png" alt="" /></div>



                    </div>
                }
            </div>
        </div>
  )
}
