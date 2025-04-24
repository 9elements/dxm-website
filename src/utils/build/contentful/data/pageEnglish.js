import client from "../contentful-client.js";

export default async () => {
  const pageEnglish = await client
    .getEntries({
      content_type: "pageEnglish",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageEnglish[0];
};
