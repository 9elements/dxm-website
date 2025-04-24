import fs from "fs";
import path from "path";

//Beispiel
import ctflContactPerson from "./data/contactPerson.js";
import ctflNewsletterArticle from "./data/newsletterArticle.js";
import ctflPageMedia from "./data/pageMedia.js";
import ctflTextPages from "./data/textPages.js";
import ctflPublikationen from "./data/publikation.js";
import ctflPublishers from "./data/publishers.js";
import ctflFunktion from "./data/funktion.js";
import ctflStartup from "./data/startup.js";
import ctflpageKeynoteSpeaker from "./data/pageKeynoteSpeaker.js";
import ctflpagePublikationen from "./data/pagePublikationen.js";
import ctflpageClub from "./data/pageClub.js";
import ctflclubUpcomingEvent from "./data/clubUpcomingEvent.js";
import ctflpagePress from "./data/pagePress.js";
import ctflpageHome from "./data/pageHome.js";
import ctflpageKontakt from "./data/pageKontakt.js";
import ctflpageEnglish from "./data/pageEnglish.js";
import ctflpageOekosystem from "./data/pageOekosystem.js";

// Create an Object to write the json files
// Object key will be the filename and the value will be the file's content
const ctflData = {
  contactPerson: ctflContactPerson,
  newsletterArticle: ctflNewsletterArticle,
  pageMedia: ctflPageMedia,
  pageClub: ctflpageClub,
  clubUpcomingEvent: ctflclubUpcomingEvent,
  pagePress: ctflpagePress,
  pageHome: ctflpageHome,
  textPages: ctflTextPages,
  publikation: ctflPublikationen,
  publishers: ctflPublishers,
  funktion: ctflFunktion,
  startup: ctflStartup,
  pageKeynoteSpeaker: ctflpageKeynoteSpeaker,
  pagePublikationen: ctflpagePublikationen,
  pageKontakt: ctflpageKontakt,
  pageEnglish: ctflpageEnglish,
  pageOekosystem: ctflpageOekosystem,
};

// directory path
const dir = path.resolve(process.cwd(), "src/_data/ctfl");

// create new directory
try {
  // first check if directory already exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("Directory is created.");
  } else {
    console.log("Directory already exists.");
  }
} catch (err) {
  console.log(err);
}

async function writeJson(fetchData, filename) {
  const ctflData = await fetchData();
  fs.writeFile(
    `src/_data/ctfl/${filename}.json`,
    JSON.stringify(ctflData),
    (err) => {
      // Checking for errors
      if (err) throw err;

      console.log("Done writing " + filename); // Success
    }
  );
}

Object.keys(ctflData).forEach((key) => {
  writeJson(ctflData[key], key);
});
