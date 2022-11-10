// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageNewsletter = await client
    .getEntries({
      content_type: "pageNewsletter",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageNewsletter[0].fields;
};
