// import the client
import client from "../contentful-client.js";

export default async () => {
  const textPages = await client
    .getEntries({
      content_type: "textPages",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return textPages;
};
