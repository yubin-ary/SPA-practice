const API_URL = "https://burger-api-two.vercel.app/api/menu/";

export const request = async (category, sortBy, searchWord) => {
  try {
    const response = await fetch(API_URL);
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
