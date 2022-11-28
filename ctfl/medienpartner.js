const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const medienpartner = await client
    .getEntries({
      content_type: "medienpartner",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return medienpartner;
};
