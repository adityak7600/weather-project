const bodyParser = require("body-parser");
const express= require("express");
const https =require("https");
const { urlencoded } = require("body-parser");


const app=express();

   app.use(bodyParser.urlencoded({extended: false}));  // to support URL-encoded bodies
 app.get("/",function(req,res) {

res.sendFile(__dirname +"/index.html");
});


app.post("/",function(req,res){
    
    const query="req.body.cityname"
    const apikey="f59dd5cee1e562c3b6f0b21d84b498c2"
    const unit="matric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apikey +"&units= " + unit
    
    https.get(url,function(response){
    console.log(response.statusCode);
    
    response.on("data",function(data){
    const weatherData= JSON.parse(data)
    const temp = weatherData.main.temp
    
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p>The weather is currently " + weatherDescription + "</p>");
    res.write("<h1> The temprature in " + query + " is " + temp + " degrees celcious")
    res.write("<img src=>" + imageURL +">");
    res.send();
    });
        
    });
});

app.listen(3000,function(req,res){
console.log("server is running at port 3000");
});