import client from "../contentful-client.js";

export default async () => {
  const pageKontakt = await client
    .getEntries({
      content_type: "pageKontakt",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageKontakt[0];
};
