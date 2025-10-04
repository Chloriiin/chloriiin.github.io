import { createClient } from 'contentful';

const client = createClient({
    space: "w2xk73k1hf3e",
    accessToken: "0DJhzOSwBQXEzuamK3vVou-G5M4ku2AFd8xvLLeVmg4",
  });
  
export const fetchImageGallery = async () => {
    const response = await client.getEntries({
      content_type: "imageGallery", // Your content type name in Contentful
    });
    return response.items; // Return the items from the response
};