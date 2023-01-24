// import the client
const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const publikation = await client
    .getEntries({
      content_type: 'publikation',
      order: 'fields.releaseYear',
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return publikation;
};
