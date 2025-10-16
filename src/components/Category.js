//세트/단품/사이드/음료 구분하기
export default function Category({ $app, initialState, handleCategory }) {
  this.state = initialState;
  this.handleCategory = handleCategory;

  this.$target = document.createElement("div");
  this.$target.className = "category";
  $app.appendChild(this.$target);

  this.template = () => {
    let temp = `<hr />
    <div id="All">🌟 전체</div>
  <div id="set">🍽️ 세트 메뉴</div>
    <div id="burger">🍔 단품 메뉴</div>
   <div id="side">🍟 사이드 메뉴</div>`;
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    if (this.state) {
      let $currentCategory;
      $currentCategory = document.getElementById(this.state);
      $currentCategory && ($currentCategory.className = "clicked");
    } else {
      document.getElementById("All").className = "clicked";
    }
    const $category = this.$target.querySelectorAll("div");
    $category.forEach((Element) => {
      Element.addEventListener("click", () => {
        this.handleCategory(Element.id);
      });
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
