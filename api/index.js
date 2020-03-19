
const getResponse = require('../response');

module.exports = async function (req, res) {
  const { body } = req
  username = "hlahla";
  password = "alsdkfjs";
  
  const myres = await getResponse(username, password);
  res.statusCode = 200;
  res.send(myres);
};


