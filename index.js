const puppeteer = require('puppeteer');

//TO BE IMPLEMENTED - some way to hash the password to keep credentials secure from attacks
async function myScript(username, password) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
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
  //Honors Application Check
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
  return acceptanceText;
};

//exports myScript to api 
exports.myScript = myScript;