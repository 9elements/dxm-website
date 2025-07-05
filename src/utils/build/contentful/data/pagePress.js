import client from "../contentful-client.js";

export default async () => {
  try {
    const response = await client.getEntries({
      content_type: "pageShop",
    });

    if (!response.items || response.items.length === 0) {
      console.error("Contentful: No pagePress entries found.");
      return null;
    }

    return response.items[0];
  } catch (error) {
    console.error("Contentful fetch error (pagePress):", error);
    return null;
  }
};
