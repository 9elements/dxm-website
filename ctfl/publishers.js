// import the client
const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const publishers = await client
    .getEntries({
      content_type: 'publikation',
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item.fields.publisher;
      });

      // sort so null is at the end
      return items.sort((a, b) => a < b);
    })
    .catch(console.error);

  // remove duplicate entries
  return [...new Set(publishers)];
};
