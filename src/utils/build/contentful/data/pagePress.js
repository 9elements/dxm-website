import client from "../contentful-client.js";

export default async () => {
  const pagePress = await client
    .getEntries({
      content_type: "pageShop",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pagePress[0];
};
