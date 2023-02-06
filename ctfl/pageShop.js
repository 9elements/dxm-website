const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageShop = await client
    .getEntries({
      content_type: 'pageShop',
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageShop[0];
};
