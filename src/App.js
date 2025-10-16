import Header from "./components/Header.js";
import MenuList from "./components/MenuList.js";
import { request } from "./components/api.js";
import Category from "./components/Category.js";
import MenuDetail from "./components/MenuDetail.js";

export default function App($app) {
  // =========================================================================
  // this.state

  // =========================================================================
  this.state = {
    category: "",
    sortBy: "",
    searchWord: "",
    menus: [],
    currentPage: "",
  };

  // =============================================================================
  // Header
  // =============================================================================

  const header = new Header({
    $app,
    initialState: {
      sortBy: this.state.sortBy,
      searchWord: this.state.searchWord,
    },
    handleSortBy: async (sortBy) => {
      const pageUrl = `?category=${this.state.category}&sort=${sortBy}`;
      history.pushState(
        null,
        null,
        this.state.searchWord
          ? pageUrl + `&q=${this.state.searchWord}`
          : pageUrl
      );
      const menus = await request(
        this.state.category,
        sortBy,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        sortBy: sortBy,
        menus: menus.menus,
      });
    },
    handleSearchWord: async (searchWord) => {
      const pageUrl = `/?category=${this.state.category}&sort=${this.state.sortBy}`;
      history.pushState(null, null, `${pageUrl}&q=${searchWord}`);

      const res = await request(
        this.state.category,
        this.state.sortBy,
        searchWord
      );
      this.setState({
        ...this.state,
        searchWord: searchWord,
        menus: res.menus,
      });
    },
  });

  const category = new Category({
    $app,
    initialState: this.state.category,
    handleCategory: async (category) => {
      const pageUrl = `/?category=${category}`;
      history.pushState(
        null,
        null,
        window.location.search.includes("q=" || "search")
          ? `/?category=${category}&sort=${this.state.sortBy}&q=${this.state.searchWord}`
          : pageUrl
      );

      const res = await request(
        category,
        this.state.sortBy,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        menus: res.menus,
        category: category,
      });
    },
  });
  // ===========================================================================
  // news

  // ===========================================================================
  setTimeout(() => {
    alert(
      "⭐️ 새로운 소식 ! ⭐️\n이달의 도전 메뉴 '김은수 키만한 버거' 출시 임박!\n"
    );
  }, 500);

  // ===========================================================================
  // menulist
  // ===========================================================================
  const menuList = new MenuList({
    $app,
    initialState: this.state.menus, //*** */
  });

  const menuDetail = new MenuDetail({
    $app,
    initialState: this.state.currentPage,
  });
  // =========================================================================
  // this.setState
  // =========================================================================

  this.setState = (newState) => {
    this.state = newState;
    header.setState({
      sortBy: this.state.sortBy,
      searchWord: this.state.searchWord,
    });
    menuList.setState(this.state.menus);
    category.setState(this.state.category);
  };

  // =============================================================================
  // category
  // =============================================================================

  // ===========================================================================
  // init
  // ===========================================================================
  const init = async () => {
    const res = await request(
      this.state.category,
      this.state.sortBy,
      this.state.searchWord
    );
    console.log(res);

    this.setState({
      ...this.state,
      category: "All",
      menus: res.menus,
    });
    console.log(this.state);
  };
  // ===========================================================================
  // 뒤로 가기 앞으로 가기
  // ===========================================================================
  const getCategory = () => {
    if (
      window.location.search.includes("category=") &&
      window.location.search.includes("sort=" || "q=")
    ) {
      return window.location.search.split("category=")[1].split("&")[0];
    } else if (window.location.search.includes("category=")) {
      return window.location.search.split("category=")[1];
    }
    return "All";
  };

  const getSortBy = () => {
    if (window.location.search.includes("sort=")) {
      if (window.location.search.includes("q=")) {
        return window.location.search.split("sort=")[1].split("&")[0];
      } else return window.location.search.split("sort=")[1];
    }
    return "";
  };

  const getSearchWord = () => {
    if (window.location.search.includes("q=")) {
      return decodeURIComponent(window.location.search.split("q=")[1]);
    }
    return "";
  };

  window.addEventListener("popstate", async () => {
    const prevCategory = getCategory();
    const prevSortBy = getSortBy();
    const prevSearchWord = getSearchWord();
    const prevMenus = await request(prevCategory, prevSortBy, prevSearchWord);

    this.setState({
      ...this.state,
      category: prevCategory,
      sortBy: prevSortBy,
      searchWord: prevSearchWord,
      menus: prevMenus.menus,
    });
  });

  init();
}
