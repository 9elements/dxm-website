const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageShopBestellung = await client
    .getEntries({
      content_type: 'pageShopBestellung',
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageShopBestellung[0];
};
