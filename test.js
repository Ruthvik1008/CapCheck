const puppeteer = require('puppeteer');

async function myScript() {
  //launches pupeteer, change properties here
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  const path = require('path');
  const fs = require('fs');

  //creates path for the JSON file, which contains the credentials
  const jsonPath = path.join(__dirname, 'credentials.JSON');
  const credentials = JSON.parse(fs.readFileSync(jsonPath))
  const url = 'https://login.utexas.edu/login/cdcservlet?goto=https%3A%2F%2Futdirect.utexas.edu%3A443%2Fapps%2Fadm%2Fmystatus%2F&RequestID=1574821359911&MajorVersion=1&MinorVersion=0&ProviderID=https%3A%2F%2Futdirect.utexas.edu%3A443%2Famagent%3FRealm%3D%2Fadmin%2Futdirect-realm&IssueInstant=2019-11-27T02%3A22%3A39Z';
  await page.goto(url);
  var username = credentials.username;
  var password = credentials.password;

  //login
  await page.type('#IDToken1', username);
  await page.type('#IDToken2', password);
  await page.click('#login_btn');
  await page.waitForNavigation();

  try {
    await page.waitForNavigation();
    if (await page.evaluate(() => window.find('You are admitted to The University of Texas at Austin'))) {
      console.log("You have been admitted")
    }
    browser.close();
  } catch (e) {
    console.log('Error: ', e.message)
  }
};

myScript()