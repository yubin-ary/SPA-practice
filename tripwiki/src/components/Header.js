export default function Header({
  $app,
  initialState,
  handleSortChange,
  handleSearch,
}) {
  this.state = initialState;
  this.handleSortChange = handleSortChange;
  this.handleSearch = handleSearch;

  this.$target = document.createElement("div");
  this.$target.className = "header";
  $app.appendChild(this.$target);

  this.template = () => {
    // header 에는 2개의 state 가 있으므로 구조분해 할당해서 편하게 사용.
    const { sortBy, searchWord } = this.state;
    let temp = `<div class="title"> 
            <a href="/">✈️Trip Wiki</a>
        </div>
        <div class="filter-search-container">
            <div class="filter">
                <select id="sortList" class='sort-list'>
                    <option value="total" ${
                      sortBy === "total" ? "selected" : ""
                    }>Total</option>

                    <option value="cost"${
                      sortBy === "cost" ? "selected" : ""
                    }>Cost</option>

                    <option value="fun"${
                      sortBy === "fun" ? "selected" : ""
                    }>Fun</option>

                    <option value="safety"${
                      sortBy === "safety" ? "selected" : ""
                    }>Safety</option>
                    
                    <option value="internet"${
                      sortBy === "internet" ? "selected" : ""
                    }>Internet</option>
                    <option value="air-quality"${
                      sortBy === "air-quality" ? "selected" : ""
                    }>Air Quality</option>
                    <option value="food"${
                      sortBy === "food" ? "selected" : ""
                    }>Food</option>
                </select>
            </div>
            <div class="search">
                    <input type="text"value='${searchWord}'name=''id='search'placeholder='search' autocomplete="off">
            </div>
        </div>`;

    return temp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
    document.getElementById("sortList").addEventListener("change", (event) => {
      this.handleSortChange(event.target.value);
    });
    const $searchInput = document.getElementById("search");
    $searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleSearch($searchInput.value);
      }
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
