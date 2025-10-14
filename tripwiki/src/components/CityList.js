export default function CityList({ $app, initialState }) {
  //app.js 에서 받은 상태로 initialState 업데이트함.
  this.state = initialState;

  //요소 생성
  this.$target = document.createElement("div");
  this.$target.className = "city-list";

  $app.appendChild(this.$target);

  this.template = () => {
    let temp = `<div class="city-items-container">`;
    if (this.state) {
      this.state.cities.forEach((Element) => {
        temp +=
          //temp에 필요한 값을 넣는다. (화면에 표시할 값)
          `<div class="city-item" id=${Element.id}>
            <img src=${Element.image}>
            <div class="city-item-info">${Element.city}, ${Element.country}</div>
            <div class="city-item-score">⭐️ ${Element.total}</div>
        </div>`;
      });

      temp += "</div>";
    }
    return temp;
  };

  //화면에 표시 해주기
  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  //상태 업데이트
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  //렌더함수 호출
  this.render();
}
