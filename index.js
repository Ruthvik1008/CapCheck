const puppeteer = require('puppeteer');
var bodyParser = require('body-parser'); //used to parse JSON
//SEARCH TO BE IMPLEMENTED to find the improvemented needed
//TO BE IMPLEMENTED - some way to hash the password to keep credentials secure from attacks
async function myScript(username, password) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const url = 'https://login.utexas.edu/login/cdcservlet?goto=https%3A%2F%2Futdirect.utexas.edu%3A443%2Fapps%2Fadm%2Fmystatus%2F&RequestID=1574821359911&MajorVersion=1&MinorVersion=0&ProviderID=https%3A%2F%2Futdirect.utexas.edu%3A443%2Famagent%3FRealm%3D%2Fadmin%2Futdirect-realm&IssueInstant=2019-11-27T02%3A22%3A39Z';
  await page.goto(url);

  //enters credentials and clicks login
  await page.type('#IDToken1', username);
  await page.type('#IDToken2', password);
  await page.click('#login_btn');
  await page.waitForNavigation();

  var jsonRes = {};
  //TO BE IMPLEMENTED 
  //A CHECK IF WRONG USERNAME or PASSWORD
  // await page.waitFor(4000)
  // if (await page.evaluate(() => window.find('incorrect'))) {
  //   console.log('works');
  //   return "Your UT EID or password was incorrect. Please try again.";
  // }

  //gets information from the UTAustin website
  try {
    await page.waitForNavigation();


    if (await page.evaluate(() => window.find('You are admitted to The University of Texas at Austin'))) {
      acceptanceText = await page.evaluate(() => document.querySelector('#APP04AR > h3').innerText)
      majorInfo = await page.evaluate(() => document.querySelector("#APP04AR > div > p").innerText)
      var lastIndex = majorInfo.indexOf('major');
      var major = majorInfo.substring(41, lastIndex);

      jsonRes["normal-acceptance"] = acceptanceText;
      jsonRes["major"] = major;
    }
    else if (await page.evaluate(() => window.find("CAP"))) {
      acceptanceText = "You've been invited to the CAP program. Please visit MyStatus to learn more.";
      jsonRes["normal-acceptance"] = acceptanceText;
    }
    else {
      acceptanceText = "No updates yet, please check back later";
      jsonRes["normal-acceptance"] = acceptanceText;
    }
    //CHECK IF REJECTED TO BE IMPLEMENTED
  } catch (e) {
    console.log('Error: ', e.message)
  }
  //Honors Application Check
  await page.goto("https://utdirect.utexas.edu/apps/adm/mystatus/honors/");

  try {
    await page.waitForNavigation;
    if (await page.evaluate(() => window.find('accepted'))) {
      honorsStatus = "Congratulations! You've been accepted into one or more program.";
      jsonRes["honors-acceptance"] = honorsStatus;
    }
    else if (await page.evaluate(() => window.find('not able to offer'))) {
      honorsStatus = "You have been rejected from one or more honors programs.";
      jsonRes["honors-acceptance"] = honorsStatus;
    }
    else {
      honorsStatus = "There hasn't been an update yet to your honors application.";
      jsonRes["honors-acceptance"] = honorsStatus;
    }
    //NEED TO IMPLEMENT FOR THOSE WHO ARE REJECTED

  } catch (e) {
    console.log('Error: ', e.message)
  }
  browser.close()
  return jsonRes;
};

//exports myScript to api 
exports.myScript = myScript;