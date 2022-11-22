// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const publishers = await client
    .getEntries({
      content_type: "publikation",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item.fields.publisher;
      });
      return items;
    })
    .catch(console.error);

  // remove duplicate entries
  return [...new Set(publishers)];
};
