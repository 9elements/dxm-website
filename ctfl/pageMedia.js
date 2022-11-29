const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageMedia = await client
    .getEntries({
      content_type: "pageMedia",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageMedia[0];
};
