const API_URL = "https://burger-api-two.vercel.app/api/menu/?";

export const request = async (category, sortBy, searchWord) => {
  try {
    let url = `${API_URL}`;
    if (category && category !== "All") {
      url += `?category=${category}`;
    }
    if (sortBy) {
      url += `&sort=${sortBy}`;
    }
    if (searchWord) {
      url += `&q=${searchWord}`;
    }
    const response = await fetch(url);
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
