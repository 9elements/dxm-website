// import the client
import client from "../contentful-client.js";

export default async () => {
  const publikation = await client
    .getEntries({
      content_type: "publikation",
      order: "fields.releaseYear",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return publikation;
};
