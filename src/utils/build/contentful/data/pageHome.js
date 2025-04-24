import client from "../contentful-client.js";

export default async () => {
  const pageHome = await client
    .getEntries({
      content_type: "pageHome",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageHome[0];
};
