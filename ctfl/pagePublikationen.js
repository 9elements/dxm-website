const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pagePublikationen = await client
    .getEntries({
      content_type: 'pagePublikationen',
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pagePublikationen[0];
};
