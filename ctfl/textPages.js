// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const textPages = await client
    .getEntries({
      content_type: "textPages",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return textPages;
};
