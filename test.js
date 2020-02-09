const puppeteer = require('puppeteer');

async function myScript() {
  //launch pupeteer and change properties
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

  //enters credentials and clicks login
  await page.type('#IDToken1', username);
  await page.type('#IDToken2', password);
  await page.click('#login_btn');
  await page.waitForNavigation();

  //gets information from the UTAustin website
  try {
    await page.waitForNavigation();
    if (await page.evaluate(() => window.find('You are admitted to The University of Texas at Austin'))) {
      acceptanceText = await page.evaluate(() => document.querySelector('#APP04AR > h3').innerText)
      console.log(acceptanceText)
      console.log()
      moreText = await page.evaluate(() => document.querySelector("#APP04AR > div > p").innerText)
      console.log(moreText)
      console.log()
    }
    else if(await page.evaluate(() => window.find("CAP"))) {
      console.log("You've been invited to the CAP program. Please visit MyStatus to learn more.")
    }
    else{
      console.log("No updates yet, please check back later")
    }
    //NEED TO IMPLEMENT A CHECK FOR REJECTED 
  } catch (e) {
    console.log('Error: ', e.message)
  }
  //opens honors program
  await page.goto("https://utdirect.utexas.edu/apps/adm/mystatus/honors/");

  try {
    await page.waitForNavigation;
    if (await page.evaluate(() => window.find('accepted'))) {
      console.log("you've been accepted into one or more program")
    }
    else {
      console.log("There hasn't been an update yet to your honors application")
    }
    //NEED TO IMPLEMENT FOR THOSE WHO ARE REJECTED
    browser.close()
  } catch (e) {
    console.log('Error: ', e.message)
  }
};

myScript()