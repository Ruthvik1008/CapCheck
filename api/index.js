
var bodyParser = require('body-parser'); //used to parse JSON
const getResponse = require('../response');

module.exports = async function (req, res) {
  const { body } = req
  username = body.username;
  password = body.password;
  
  const myres = await getResponse(username, password);
  res.statusCode = 200;
  res.send(myres);
};


