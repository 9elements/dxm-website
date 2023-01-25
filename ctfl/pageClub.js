// import the client
const client = require('../src/utils/contentfulClient.js');

module.exports = async () => {
  const pageClub = await client
    .getEntries({
      content_type: 'pageClub',
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageClub[0];
};
