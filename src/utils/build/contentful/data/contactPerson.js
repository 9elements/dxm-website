import client from "../contentful-client.js";

export default async () => {
  const contactPerson = await client
    .getEntries({
      content_type: "contactPerson",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return contactPerson;
};
