const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageKontakt = await client
    .getEntries({
      content_type: 'pageKontakt',
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageKontakt[0];
};
