export default function MenuList({ $app, initialState }) {
  this.state = initialState;
  console.log(this.state);
  this.$target = document.createElement("div");
  this.$target.className = "menu-list";
  $app.appendChild(this.$target);

  this.template = () => {
    let temp = `<div class="menu-list-container">`;

    this.state.forEach((element) => {
      temp += `
            <div class="menu-list-item">
                <img src="${element.image}">
                <div id="name-title">${element.name}</div>
                <div id="menu-price">${element.price} 원</div>
            </div>`;
    });
    temp += "</div>";
    return temp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
  };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
