const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pagePress = await client
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

  return pagePress[0];
};
