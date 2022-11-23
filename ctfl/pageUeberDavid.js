// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageUeberDavid = await client
    .getEntries({
      content_type: "pageUeberDavid",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageUeberDavid[0];
};
