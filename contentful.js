const fs = require("fs");

//Beispiel
const ctflTextPages = require("./ctfl/textPages.js");
const ctflNewsletterArticle = require("./ctfl/newsletterArticle.js");
const ctflContactPerson = require("./ctfl/contactPerson.js");

// Create an Object to write the json files
// Object key will be the filename and the value will be the file's content
const ctflData = {
  //Beispiel
  textPages: ctflTextPages,
  newsletterArticle: ctflNewsletterArticle,
  contactPerson: ctflContactPerson,
};

// directory path
const dir = "src/_data/ctfl";

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
