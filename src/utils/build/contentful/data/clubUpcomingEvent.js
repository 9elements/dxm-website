// import the client
import client from "../contentful-client.js";

export default async () => {
  const clubUpcomingEvent = await client
    .getEntries({
      content_type: "clubUpcomingEvent",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return clubUpcomingEvent[0];
};
