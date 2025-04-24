import client from "../contentful-client.js";

export default async () => {
  const newsletterArticle = await client
    .getEntries({
      content_type: "newsletterArticle",
      order: "fields.articleNumber",
    })
    .then(function (response) {
      const items = response.items.map((item) => {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return newsletterArticle;
};
