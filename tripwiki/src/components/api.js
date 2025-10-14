//api를 호출하고 필요한 값을 반환받을 수 있게 작성해야한다.

const API_URL = "https://trip-wiki-api.vercel.app/";

export const request = async (startIdx, region, sortBy, searchWord) => {
  //검색어나 필터에 따라 반환데이터를 다르게 해준다.
  try {
    let url = `${API_URL}`;
    if (region && region !== "All") {
      url += `${region}?start=${startIdx}`; //지역
    } else {
      url += `?start=${startIdx}`; //시작인덱스
    }
    if (sortBy) {
      url += `&sort=${sortBy}`;
    } //정렬
    if (searchWord) {
      url += `&search=${searchWord}`;
    } //검색어
    const response = await fetch(url);
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
