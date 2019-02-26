const express = require('express');
const path = require('path');
const request =require('request');
//var request = require('request-promise');
var bodyParser = require('body-parser');
var apiKey="e85e0a3142231dab28a2611888e48f22";
const app = express();


app.use(express.static(path.resolve(__dirname, "public")));

app.use(bodyParser.urlencoded({extended:true}));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.render('index');
   
});

app.post("/",(req,res)=>
{
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
 request(url,(err,response,body)=>
{
    let weather = JSON.parse(body);
 if (err)
    {
        
        res.render("index",{weather:null,error:"Error,Please Tryagain"});
    }
else 
    {
        
        if (weather.main ==  undefined)
            {
                res.render('index',{weather:null,error:"Error,Please Tryagain"});
                
            }


            else 
                {
                    var temp = Math.round((weather.main.temp -32)*(5/9));
                    var Celcius= `${temp}`;
                    var Cityname=`${weather.name}`;
                    var NewTemp=`Its ${temp} degree in ${weather.name}`;
                    res.render('index',{weather:NewTemp,error:null,weathertemp:Celcius,weathername:Cityname});        
                }
    }





});});


app.use((req, res) => {
   
    res.status(403).render("404");

});

var port= process.env.port ||3000;
app.listen(port, () => {
    console.log("Server running!");
});