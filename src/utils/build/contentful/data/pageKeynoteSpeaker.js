// import the client
import client from "../contentful-client.js";

export default async () => {
  const pageKeynoteSpeaker = await client
    .getEntries({
      content_type: "pageUeberDavid",
      include: 5,
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageKeynoteSpeaker[0];
};
