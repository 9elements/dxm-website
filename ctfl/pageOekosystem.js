const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageOekosystem = await client
    .getEntries({
      content_type: 'pageOekosystem',
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageOekosystem[0];
};
