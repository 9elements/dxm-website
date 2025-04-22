import client from "../contentful-client.js";

export default async () => {
  const pagePublikationen = await client
    .getEntries({
      content_type: "pagePublikationen",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pagePublikationen[0];
};
