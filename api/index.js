const express = require('express');
const app = express()
const puppeteer = require('puppeteer');
var bodyParser = require('body-parser'); //used to parse JSON
const response = require('./response');

module.exports = async function (req, res) {
  username = req.body.username;
  password = req.body.password;
 
  const myres = await response(username, password);

  res.send(myres);
};


