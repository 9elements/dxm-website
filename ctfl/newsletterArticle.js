const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const newsletterArticle = await client
    .getEntries({
      content_type: "newsletterArticle",
      order: "fields.articleNumber",
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
