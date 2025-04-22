import client from "../contentful-client.js";

export default async () => {
  const pageMedia = await client
    .getEntries({
      content_type: "pageMedia",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageMedia[0];
};
