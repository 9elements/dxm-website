// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const newsletterArticle = await client
    .getEntries({
      content_type: "newsletterArticle",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return newsletterArticle;
};
