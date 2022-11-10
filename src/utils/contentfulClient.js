require("dotenv").config();
const contentful = require("contentful");

let CTFLHost = process.env.CTFL_HOST;
let CTFLToken = process.env.CTF_CDA_ACCESS_TOKEN;
let CTFLSpace = process.env.CTF_SPACE_ID;

if (process.env.API == "preview") {
  CTFLHost = process.env.CTFL_PREVIEW_HOST;
  CTFLToken = process.env.CTF_CDA_PREVIEW_ACCESS_TOKEN;
}

const contentfulClient = contentful.createClient({
  host: CTFLHost,
  accessToken: CTFLToken,
  space: CTFLSpace,
});

module.exports = contentfulClient;
