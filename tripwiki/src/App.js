import Header from "./components/Header.js";
import RegionList from "./components/RegionList.js";
import CityList from "./components/CityList.js";
import CityDetail from "./components/CityDetail.js";
import { request } from "./components/api.js";

export default function App($app) {
  const getSortBy = () => {
    if (window.location.search) {
      return window.location.search.split("sort=")[1].split("&")[0];
    }
    return "total";
  };
  const getSearchWord = () => {
    //url의 매개변수는 window.location.search 를 통해 가져올 수 있다
    if (window.location.search.includes("search=")) {
      //search= 기준 바로 뒤에 있는 문자열 반환(검색어 반환))
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  // ===========================================================================
  // this.state
  // ===========================================================================

  this.state = {
    startIdx: 0, // 몇번째 사진부터 불러올건지
    sortBy: getSortBy(), // 헤더의 정렬필터의 값
    searchWord: getSearchWord(), //검색어
    region: "", //어떤 지역이 선택되었는지
    cities: "", //어떤 도시
    currentPage: window.location.pathname,
  };
  // =============================================================================
  //renderheader
  // ===========================================================================
  const renderHeader = () => {
    new Header({
      $app,
      initialState: {
        sortBy: this.state.sortBy,
        searchWord: this.state.searchWord,
      },
      //변경된 정렬 기준값을 매개변수로 받는 함수.
      handleSortChange: async (sortBy) => {
        //값이 변경될 때마다 페이지의 url을 변경시켜준다. 변경될 url 작성한다.
        const pageUrl = `/${this.state.region}?sort=${sortBy}`;
        history.pushState(
          null,
          null,
          this.state.searchWord
            ? pageUrl + `&search=${this.state.searchWord}`
            : pageUrl
        );
        //새로운 데이터 불러오기
        const cities = await request(
          0,
          this.state.region,
          sortBy,
          this.state.searchWord
        );
        //상태 업데이트 해주기 ->Header 컴포넌트 맨 아래에 정의된 this.setState 함수에서 처리된다!
        this.setState({
          ...this.state,
          startIdx: 0,
          sortBy: sortBy,
          cities: cities,
        });
      },
      handleSearch: async (searchWord) => {
        history.pushState(
          null,
          null,
          `/${this.state.region}?sort=${this.state.sortBy}&search=${searchWord}`
        );
        //새로운 데이터 불러오기
        const cities = await request(
          0,
          this.state.region,
          this.state.sortBy,
          searchWord
        );
        //상태 업데이트 해주기
        this.setState({
          ...this.state,
          startIdx: 0,
          searchWord: searchWord,
          cities: cities,
        });
      },
    });
  };
  // ===========================================================================
  // header
  // ===========================================================================

  /* const header = new Header({
    $app,
    initialState: {
      sortBy: this.state.sortBy,
      searchWord: this.state.searchWord,
    },
    //변경된 정렬 기준값을 매개변수로 받는 함수.
    handleSortChange: async (sortBy) => {
      //값이 변경될 때마다 페이지의 url을 변경시켜준다. 변경될 url 작성한다.
      const pageUrl = `/${this.state.region}?sort=${sortBy}`;
      history.pushState(
        null,
        null,
        this.state.searchWord
          ? pageUrl + `&search=${this.state.searchWord}`
          : pageUrl
      );
      //새로운 데이터 불러오기
      const cities = await request(
        0,
        this.state.region,
        sortBy,
        this.state.searchWord
      );
      //상태 업데이트 해주기 ->Header 컴포넌트 맨 아래에 정의된 this.setState 함수에서 처리된다!
      this.setState({
        ...this.state,
        startIdx: 0,
        sortBy: sortBy,
        cities: cities,
      });
    },
    handleSearch: async (searchWord) => {
      history.pushState(
        null,
        null,
        `/${this.state.region}?sort=${this.state.sortBy}&search=${searchWord}`
      );
      //새로운 데이터 불러오기
      const cities = await request(
        0,
        this.state.region,
        this.state.sortBy,
        searchWord
      );
      //상태 업데이트 해주기
      this.setState({
        ...this.state,
        startIdx: 0,
        searchWord: searchWord,
        cities: cities,
      });
    },
  });
  */
  // ===========================================================================
  // render region list
  // ===========================================================================

  const renderRegionList = () => {
    new RegionList({
      $app,
      initialState: this.state.region,
      handleRegion: async (region) => {
        history.pushState(null, null, `/${region}?sort=total`);

        const cities = await request(0, region, "total", "");
        this.setState({
          ...this.state,
          startIdx: 0,
          sortBy: "total",
          region: region,
          searchWord: "",
          cities: cities,
        });
      },
    });
  };
  // ============================================================================
  // regionList
  // ============================================================================
  /* 
  const regionList = new RegionList({
    $app,
    initialState: this.state.region,
    handleRegion: async (region) => {
      history.pushState(null, null, `/${region}?sort=total`);

      const cities = await request(0, region, "total", "");
      this.setState({
        ...this.state,
        startIdx: 0,
        sortBy: "total",
        region: region,
        searchWord: "",
        cities: cities,
      });
    },
  });
  */
  // =============================================================================
  // render city list
  // =============================================================================
  const renderCityList = () => {
    const cityList = new CityList({ $app, initialState: this.state.cities });
  };
  // =============================================================================
  // city list
  // =============================================================================
  //const cityList = new CityList({ $app, initialState: this.state.cities });
  // ===========================================================================

  // ===========================================================================
  // render citydetail
  // ===========================================================================

  const renderCityDetial = () => {
    cityDetail = new CityDetail();
  };

  // ===========================================================================
  // setstate
  // ===========================================================================

  this.setState = (newState) => {
    this.state = newState;
    render();
  };
  // =============================================================================
  // render
  // =============================================================================
  const render = () => {
    const path = this.state.currentPage;
    $app.innerHTML = "";
    if (path.startsWith("/city/")) {
      renderHeader();
      renderCityDetial();
    } else {
      renderHeader();
      renderRegionList();
      renderCityList();
    }
  };
  // ===========================================================================
  // init
  // ===========================================================================
  const init = async () => {
    const path = this.state.currentPage;

    if (path.startsWith("/city/")) {
      render();
    } else {
      const cities = await request(
        this.state.startIdx,
        this.state.region,
        this.state.sortBy,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        cities: cities,
      });
    }
  };

  init();
}
