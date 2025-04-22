// import the client
import client from "../contentful-client.js";

export default async () => {
  const funktion = await client
    .getEntries({
      content_type: "startup",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item.fields.funktionVonDxM;
      });
      return items;
    })
    .catch(console.error);

  // remove duplicate entries
  return [...new Set(funktion)];
};
