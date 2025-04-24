// import the client
import client from "../contentful-client.js";

export default async () => {
  const pageClub = await client
    .getEntries({
      content_type: "pageClub",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageClub[0];
};
