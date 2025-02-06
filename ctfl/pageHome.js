const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageHome = await client
    .getEntries({
      content_type: 'pageHome',
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageHome[0];
};
