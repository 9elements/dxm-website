// import the client
import client from "../contentful-client.js";

export default async () => {
  const publishers = await client
    .getEntries({
      content_type: "publikation",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item.fields.publisher;
      });

      // sort so null is at the end
      return items.sort((a, b) => a < b);
    })
    .catch(console.error);

  // remove duplicate entries
  return [...new Set(publishers)];
};
