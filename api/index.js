
var bodyParser = require('body-parser'); //used to parse JSON
const getResponse = require('../response');

module.exports = async function (req, res) {
  username = req.body.username;
  password = req.body.password;
 
  const myres = await response(username, password);
  res.statusCode = 200;
  res.send(myres);
};


