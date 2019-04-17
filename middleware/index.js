'use strict';

const express=require('express'),
  bodyParser=require('body');

let app=express();
app.use(bodyParser.json());

app.post('/new', (req,resp) => {

});

app.post('/rate/:widget', (req,resp)=> {

});

app.get('/summary/:widget', (req, resp) => {

});

app.listen(3000);
