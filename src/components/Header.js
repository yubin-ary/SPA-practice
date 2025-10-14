//조건에 따른 정렬/ 검색

// 정렬 목록 : 칼로리/ 주문량/ 가격/
export default function Header({
  $app,
  initialState,
  handleSortBy,
  handleSearchWord,
}) {
  this.state = initialState;
  this.handleSearchWord = handleSearchWord;
  this.handleSortBy = handleSortBy;

  this.$target = document.createElement("div");
  this.$target.className = "header";
  $app.appendChild(this.$target);

  this.template = () => {
    const { sortBy, searchWord } = this.state;
    let temp = `
    <div class="title">
        <a href="/">🍔 은두의 햄부기 가게</a>
    </div>
    <div class="sort-search-container">
        <div class="sort">
            <select id="sortList">
                <option value="default">기본순</option ${
                  sortBy == "default" ? "selected" : ""
                }>
                <option value="cost"${
                  sortBy == "cost" ? "selected" : ""
                }>가격 낮은 순</option>
                <option value="calorie"${
                  sortBy == "calorie" ? "selected" : ""
                }>칼로리 낮은 순</option>
                <option value="order"${
                  sortBy == "order" ? "selected" : ""
                }>주문량 많은 순</option>
            </select>
        </div>
        <div id="search">
            <input type="text" value="${searchWord}"placeholder="검색">
        </div>
    </div>`;
    //
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    document.getElementById("sortList").addEventListener("change", (event) => {
      this.handleSortBy(event.target.value);
    });

    document.getElementById("search").addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.handleSearchWord(document.getElementById("search").value);
      }
    });
  };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
