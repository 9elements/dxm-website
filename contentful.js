const fs = require('fs');

//Beispiel
const ctflContactPerson = require('./ctfl/contactPerson.js');
const ctflNewsletterArticle = require('./ctfl/newsletterArticle.js');
const ctflPageMedia = require('./ctfl/pageMedia.js');
const ctflTextPages = require('./ctfl/textPages.js');
const ctflPublikationen = require('./ctfl/publikation.js');
const ctflPublishers = require('./ctfl/publishers.js');
const ctflFunktion = require('./ctfl/funktion.js');
const ctflStartup = require('./ctfl/startup.js');
const ctflpageUeberDavid = require('./ctfl/pageUeberDavid.js');
const ctflpagePublikationen = require('./ctfl/pagePublikationen.js');
const ctflpageClub = require('./ctfl/pageClub.js');
const ctflclubUpcomingEvent = require('./ctfl/clubUpcomingEvent.js');
const ctflpageShop = require('./ctfl/pageShop.js');
const ctflpageShopBestellung = require('./ctfl/pageShopBestellung.js');

// Create an Object to write the json files
// Object key will be the filename and the value will be the file's content
const ctflData = {
  contactPerson: ctflContactPerson,
  newsletterArticle: ctflNewsletterArticle,
  pageMedia: ctflPageMedia,
  pageClub: ctflpageClub,
  clubUpcomingEvent: ctflclubUpcomingEvent,
  pageShop: ctflpageShop,
  textPages: ctflTextPages,
  publikation: ctflPublikationen,
  publishers: ctflPublishers,
  funktion: ctflFunktion,
  startup: ctflStartup,
  pageUeberDavid: ctflpageUeberDavid,
  pagePublikationen: ctflpagePublikationen,
  pageShopBestellung: ctflpageShopBestellung,
};

// directory path
const dir = 'src/_data/ctfl';

// create new directory
try {
  // first check if directory already exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log('Directory is created.');
  } else {
    console.log('Directory already exists.');
  }
} catch (err) {
  console.log(err);
}

async function writeJson(fetchData, filename) {
  console.log(process.env.CTFL_HOST);
  console.log(process.env.CTF_SPACE_ID);
  console.log(process.env.CTF_CDA_ACCESS_TOKEN);
  const ctflData = await fetchData();
  fs.writeFile(
    `src/_data/ctfl/${filename}.json`,
    JSON.stringify(ctflData),
    (err) => {
      // Checking for errors
      if (err) throw err;

      console.log('Done writing ' + filename); // Success
    }
  );
}

Object.keys(ctflData).forEach((key) => {
  writeJson(ctflData[key], key);
});
