const express = require('express');
const app = express()

var tools = require('./index')
var bodyParser = require('body-parser'); //used to parse JSON

app.listen(process.env.PORT, () => console.log('listening on port 3000'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.post ('/', async(request, response) => {
    username = request.body.username;
    password = request.body.password;
    myRes = await tools.myScript(username,password);
    console.log(myRes);
    response.send(myRes);
    
})




const express = require('express');
const app = express()

var tools = require('./index')
var bodyParser = require('body-parser'); //used to parse JSON

app.listen(process.env.PORT, () => console.log('listening on port 3000'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.post ('/', async(request, response) => {
    username = request.body.username;
    password = request.body.password;
    myRes = await tools.myScript(username,password);
    console.log(myRes);
    response.send(myRes);
    
})




