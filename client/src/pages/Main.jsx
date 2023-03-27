import './Main.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import {ModalSettings} from "../components/ModalSettings"
import { Settings } from './Settings';
// import { Settings } from './Settings';
const Main = (props) => {
    
  const modelTempObj = {

    _id:Math.random() * 100000000,    
    text:"",
    title:"",
    user:props.userIn._id
  }
  // console.log(props.userIn);

  const [articlesArray, setArticlesArray] = useState([]);
  const [tempArticleObj, setTempArticleObject] = useState({});
  const [isTrue, setIsTrue] = useState(true);  
  const [values1, setValues1] = useState("");
  const [values2, setValues2] = useState("");

  const [userObj, setUserObj] = useState({});
  // console.log(tempArticleObj);
  const fetchData = async () => {
   const test =  await axios.get("https://first-mern-test.onrender.com");
   console.log(test);  
  // const response = await axios.get('http://localhost:5000/articles', {
  const response = await axios.get('https://first-mern-test.onrender.com/articles', {

  params: {
      param1: props.userIn._id,
    }
  }
  // console.log()
  );
    
    // console.log(response.data);
    setArticlesArray(response.data);

  }
const getUserOBject = async() => {
  const responseUserObj = await axios.get('https://first-mern-test.onrender.com/user', {
    
    params:{
      param2: props.userIn._id,
    }
  });
  // console.log(responseUserObj.data[0]);
    setUserObj(responseUserObj.data[0]);
    localStorage.setItem('theme', JSON.stringify(responseUserObj.data[0].theme));
    const themeData = localStorage.getItem('theme');
    setChangheTheme(themeData);
    setChangheThemeObj(responseUserObj.data[0].theme == "light" ?
    {
      obiortka: "obiortkaMain",
      main: "main",
      razdel: "razdel",
      dela: "textDEL",
      vodTexta:"vvvodTexta",
      dobavlenie:"dobavlenie",
      redactirovanie:"redactirovanie",
      udalenie: "udalenie",
      userBox : "userBox",
      obiortkaSettings: "obiortkaSettings",
      titlePage: "titlePage",
      titlePageTheme : "titlePageTheme",
      rowSettings:"rowSettings",
      rowSettingsTitle:"rowSettingsTitle",
      title: "title",
    }
    :
    {
      obiortka: "obiortkaMainBlack",
      main: "mainBlack",
      razdel: "razdelDark",
      dela: "textDELDark",
      vodTexta:"vvvodTextaDark",
      dobavlenie:"dobavlenieDark",
      redactirovanie:"redactirovanieDark",
      udalenie: "udalenieDark",
      userBox : "userBoxDark",
      obiortkaSettings: "obiortkaSettingsDark",
      titlePage: "titlePageDark",
      titlePageTheme : "titlePageThemeDark",
      rowSettings:"rowSettingsDark",
      rowSettingsTitle:"rowSettingsTitleDark",
      title: "titleDark",
    })
}
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(props.userIn));
    const userDataPrim = localStorage.getItem('user');
    const userData = JSON.parse(userDataPrim);
    // console.log(userData);



    setTempArticleObject(modelTempObj);
    fetchData();
    getUserOBject();

  },[]);
  // console.log(userObj);

  const onChangheTitleHandler = (event) =>{
    setValues1(event.target.value);
    const cpyObj = {...tempArticleObj};
    cpyObj.title = event.target.value;
    setTempArticleObject(cpyObj);


  };

  const onChangheTextHandler = (event) =>{
    setValues2(event.target.value);
    const cpyObj = {...tempArticleObj};
    cpyObj.text = event.target.value;
    setTempArticleObject(cpyObj);
  };
  const addInformationHandler = async () =>{
    console.log(tempArticleObj);

      if(tempArticleObj.text !=="" && tempArticleObj.title !==""){
        const res = await axios.post("https://first-mern-test.onrender.com/add", {article : tempArticleObj});
     
        const cpyObj = {...res.data};
        const cpyArticles = [...articlesArray, cpyObj]; 

        setArticlesArray(cpyArticles);
        setTempArticleObject(modelTempObj);
        setValues1("");
        setValues2("");
        
        // const res = await axios.post("http://localhost:5000/add", {article : cpyObj});
        // console.log(res);
        // console.log(res.data);
    }

    };

    const deleteInformationHandler = async (article) =>{

      const cpyArticle = articlesArray.filter((cpyArticle)=>{
        if(cpyArticle._id !== article._id){
          return cpyArticle
        }

      }); 
      // console.log(cpyArticle);
      setArticlesArray(cpyArticle);
      const res = await axios.delete("https://first-mern-test.onrender.com/delete", {data:{id:article._id}});
      console.log("res:" + res);
    };
    const onChangeObjectHandler = (article) => {
      
      setValues1(article.title);
      setValues2(article.text);
      setTempArticleObject(article);
      setIsTrue(false);
              
    };
   const onSubmitChanghes = async(event) => {
      const cpyObj = {...tempArticleObj, title: values1, text:values2};

      const cpyArticle = articlesArray.map((article)=>{
        
        if(article._id == cpyObj._id){
        // console.log(article);
          return article = {...cpyObj};
        }
        else{
          return article;
        }        
      });

      

      // console.log(cpyObj);
      setArticlesArray(cpyArticle);
      setIsTrue(true);
      setValues1("");
      setValues2("");
      setTempArticleObject(modelTempObj);
      await axios.post("https://first-mern-test.onrender.com/redax", {data:{redactObj:tempArticleObj}});

    }

    const exitFromAcc = () => {
      props.setValidation(false);
      localStorage.removeItem('user');
      window.location.reload(false);
    }
    const [changheTheme, setChangheTheme] = useState("");
    // console.log(changheTheme);
    
    const [changheThemeObj, setChangheThemeObj] = useState({});
    // console.log(changheThemeObj);
    // console.log(changheTheme);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
      <div className={changheThemeObj.obiortka}>
       {/* <div className="obiortkaMain"> */}
        
        <div className={changheThemeObj.main}>
        {/* <div className="main"> */}
          
          <div className={changheThemeObj.userBox}>
            
              <div>Добро пожаловать:</div> {userObj.login}<button onClick={exitFromAcc}>exit</button>
              <Link to="/setting" style={{ textDecoration: 'none' }}>              
              <div className="dropdown-content">
                    <p>Настройки</p>
              </div>
              </Link>

          </div>

          <div className='boxManipulation'>      
            <div className='manipulationContainer'>
              <div className={changheThemeObj.dela}>Количество Дел:{articlesArray.length}</div>
              <input className={changheThemeObj.vodTexta} value={values2} placeholder='title' onChange={onChangheTextHandler}></input>
              <input className={changheThemeObj.vodTexta} value={values1} placeholder='text' onChange={onChangheTitleHandler}></input>
            </div>
            {isTrue && 
              <div className={changheThemeObj.dobavlenie} onClick={addInformationHandler}>+</div>
            }
            {!isTrue &&
              <div className={changheThemeObj.redactirovanie} onClick={onSubmitChanghes}>*</div>
            }
          </div>

          <div className="vavodMassiva"  >

              {articlesArray.map((article) => 

                <div className= {changheThemeObj.razdel}  key={article._id}>
                  <div onClick={() =>onChangeObjectHandler(article)} className="redact">*</div>
                  <div className="textarea">"{article.text}"<div className={changheThemeObj.udalenie} onClick={() => deleteInformationHandler(article)}>-</div>  </div><br/>
                  <div className="textarea">{article.title}  </div>
                </div>
            
              )}

          </div>

        </div>
      </div> 
        }
      />
      {/* <Route path="/setting" element={<Settings/>}/> */}
          
      {/* <Route path="/setting" element={ <Settings name={tempArticleObj}/>} /> */}
      <Route path="/setting" element={ 
      <Settings 
        user={userObj} 
        setTheme = {setChangheTheme} 
        chTheme = {changheTheme}
        setChThemeObj = {setChangheThemeObj}
        objChangheTh = {changheThemeObj}
        />}
      />

      {/* <Route path="/setting" element={(props) =>{ return <Settings  age={30}  {...props} />}} /> */}
      {/* <Route path="/setting" render={(props) => <Settings name="John" age={30} {...props} />} /> */}

    </Routes>
  </BrowserRouter>

  );
}

export default Main;
