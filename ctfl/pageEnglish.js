const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageEnglish = await client
    .getEntries({
      content_type: 'pageEnglish',
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageEnglish[0];
};
