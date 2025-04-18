import axios from "axios";

const API_KEY = "49733836-ef97dcade25b1489c7fb046c8";
const limit = 15;

export async function getImagesByQuery(query, page) {
       

  const response = await axios.get("https://pixabay.com/api/", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: limit,
    },
    
  });

  return response.data;
}