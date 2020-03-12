const http = require('http');
const fetch = require("node-fetch");
const static = require('node-static');
const fileServer = new static.Server('.');
var express = require('express');
var app = express();

let url1 = "https://io.adafruit.com/api/v2/Drake_Sully/feeds/local-area1";
let url2 = "https://io.adafruit.com/api/v2/Drake_Sully/feeds/local-area2";
let url3 = "https://io.adafruit.com/api/v2/Drake_Sully/feeds/local-area3";
let url4 = "https://io.adafruit.com/api/v2/Drake_Sully/feeds/local-area4";


app.get('/login',  (req,res)=>{
  res.redirect('/html/ltr/login.html'); 
})

// Sending Last_Value1/2/3/4
app.get('/status1', async (req,res)=>{
  let response = await fetch(url1);   
  let data = await response.json();
  res.send(data);
})

app.get('/status2', async (req,res)=>{
  let response = await fetch(url2);   
  let data = await response.json();
  res.send(data);
})

app.get('/status3', async (req,res)=>{
  let response = await fetch(url3);   
  let data = await response.json();
  res.send(data);
})

app.get('/status4', async (req,res)=>{
  let response = await fetch(url4);   
  let data = await response.json();
  res.send(data);
})

app.listen(process.env.PORT || 8081);
app.use(express.static('./'))