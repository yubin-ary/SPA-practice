//조건에 따른 정렬/ 검색

import { isInternalThread } from "worker_threads";

// 정렬 목록 : 칼로리/ 주문량/ 가격/
export default function Header({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "header";
  $app.appendChild(this.$target);

  this.template = () => {
    const { sortBy, searchWord } = this.state;
    let temp = `
    <div class="title">
        <a href="/">🍔Eundoori's Hamburger</a>
    </div>
    <div class="sort-search-container">
        <div class="sort">
            <select id="sortList">
                <option value="cost">가격 낮은 순</option>
                <option value="calorie">칼로리 낮은 순</option>
                <option value="order">주문량 많은 순</option>
            </select>
        </div>
        <div class="search">
            <label
        </div>
    </div>
    
  };
}
