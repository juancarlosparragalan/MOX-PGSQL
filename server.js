const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var pos= require('./queryMicroService.js');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

let response={
    error:true,
    code:500,
    message:''
}

app.get('/', function(req, res) {
    response.code=200;
    response.message='Server Up!';
    res.send(response);
});

app.post('/dev/consulta', async function(req, res) {
    console.log(req.body);
    response = await pos.consulta(req.body) //import pg ---> api.js
    res.send(response);
});

app.use(function(req, res, next) {
    response = {
    error: true, 
    code: 404, 
    message: 'URL no encontrada'
   };
   res.status(404).send(response);
  });

app.listen(3000, function() {
    console.log('Server running on port 3000');
});