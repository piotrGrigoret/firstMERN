const Article = require("./model/Article");
const User = require("./model/User");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const { request, response } = require("express");
require('dotenv').config({path: __dirname + '/.env' });


    
const app = express();

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const start = async() => {
    try{
        mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wnvgx3j.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`); 
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}` ));

    }catch(error){
        console.log(error);
    }
};

start();

app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
);
    
app.get("/", async (request, response) => {
  
    response.send("hello world!");

    
});

app.get("/articles", async (request, response) => {
    // console.log(request.query.param1);
 
    const user = await Article.find({userId:request.query.param1});
    // console.log(user);
    try {
            response.send(user);
    }catch (error) {
        response.status(500).send(error);
    }
});


app.post("/add", async(request,response) => {

    // console.log(request.body.article);
    const article = new Article({
        title: request.body.article.title,
        text: request.body.article.text,
        userId:request.body.article.user
    });
   
    article.save((err, article) => {
        // console.log(err);
        // console.log(article)
        response.send(article);
    });
});




app.delete("/delete", async (request, response) => {
    const id = request.body.id;
    // console.log('start delete');
    // console.log(request.body);

    // console.log("id:" + request.body.id);
    Article.findByIdAndRemove(id, (err, article) =>{
        if (err){
            console.log(err)
        }

        else{
            console.log("Removed article: ", article);
        }
    });



});

app.post("/redax", async (request, response) =>{
    word = request.body.data.redactObj;
    wordId = word._id;
    // console.log("reqChanghe");
    // console.log(word);
    try {
        
            await Article.findByIdAndUpdate(
                { _id: wordId },
                {
                    text: request.body.data.redactObj.text,
                    title: request.body.data.redactObj.title
                }

            );
        // console.log("changhed object");
        // console.log(updatedResult);
    } catch (error) {
        console.log(error);
    }
});


app.post("/adduser", async(request, response) => {
    
    const user = new User({
        login: request.body.user.login,
        password: request.body.user.password,
        name:request.body.user.name,
        phone:request.body.user.phone,
        theme:request.body.user.theme,
    });
    // console.log(user);

    user.save((err, user) => {
        response.send(user);
    });
    
    
});

// app.get("/user", async (request, response) =>{
//     const user = await User.find({});
//     // console.log(user);userId:request.query.param1
//     response.send(user);
   
// });
app.get("/user", async (request, response) =>{
    const user = await User.find({_id: request.query.param2});
    response.send(user);
   
});
app.post("/userverification", async (request, response) =>{
    const user = await User.find({login: request.body.user.login});
    // const user = await User.find({});
    // console.log(user);
    response.send(user);
   
});


app.post("/changheuser", async(request, response) => {
    console.log("g");
    const updateUser = request.body.updateObj;
    console.log(updateUser);
    try {
        await User.findByIdAndUpdate(
            {_id:updateUser._id},
            {
                login: updateUser.login,
                password: updateUser.password,
                name: updateUser.name,
                phone:updateUser.phone,
                theme:updateUser.theme,
            }
        )
    } catch (error) {
        console.log(error);
    }
})

app.post("/reductpassword", async(request, response) =>{
    
    const updatePassword = request.body.password;
    console.log(updatePassword);

    try {    
        await User.findByIdAndUpdate(
            {_id:updatePassword._id},
            {
                login:updatePassword.login,
                password: updatePassword.password,
                name: updatePassword.name,
                phone:updatePassword.phone
            }
        )        
    } catch (error) {
        console.log(error);
    }
})