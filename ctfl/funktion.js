// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const funktion = await client
    .getEntries({
      content_type: "startup",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item.fields.funktionVonDxM;
      });
      return items;
    })
    .catch(console.error);

  // remove duplicate entries
  return [...new Set(funktion)];
};
