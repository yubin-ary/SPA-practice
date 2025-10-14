import Header from "./components/Header.js";
import MenuList from "./components/MenuList.js";
import { request } from "./components/api.js";

export default function App($app) {
  // =========================================================================
  // this.state
  // =========================================================================
  this.state = {
    category: "All",
    sortBy: "",
    searchWord: "",
    menus: [],
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
      history.pushState(null, null, `&q=${searchWord}`);

      const menus = await request(
        this.state.category,
        this.state.sortBy,
        searchWord
      );
      this.setState({
        ...this.state,
        searchWord: searchWord,
        menus: menus.menus,
      });
    },
  });

  // ===========================================================================
  // menulist
  // ===========================================================================

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
  };

  const menuList = new MenuList({
    $app,
    initialState: this.state.menus, //*** */
  });

  // =========================================================================

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
      menus: res.menus,
    });
    console.log(this.state);
  };

  init();
}
