export default function RegionList({ $app, initialstate, handleRegion }) {
  this.state = initialstate;
  this.handleRegion = handleRegion;

  this.$target = document.createElement("div");
  this.$target.className = "region-list";
  $app.appendChild(this.$target);

  this.template = () => {
    const regionList = [
      "🚀 All",
      "🌾 Asia",
      "🕌 Middle-East",
      "🥖 Europe",
      "💃 Latin-America",
      "🐘 Africa",
      "🏈 North-America",
      "🏄 Oceania",
    ];
    let temp = ``;
    regionList.forEach((Element) => {
      let regionId = Element.split(" ")[1];
      temp += `<div id=${regionId}>${Element}</div>`;
    });

    return temp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
    let $currentRegion;
    if (this.state) {
      $currentRegion = document.getElementById(this.state);
      $currentRegion && ($currentRegion.className = "clicked");
    } else {
      document.getElementById("All").className = "clicked";
    }
    const $regionList = this.$target.querySelectorAll("div");
    $regionList.forEach((Element) => {
      Element.addEventListener("click", () => {
        this.handleRegion(Element.id);
      });
    });
  };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
/*
  this.template = () => {
    let temp = `
         <div class=${
           this.state === "all" || "" ? "clicked" : ""
         }value='All'>🚀All</div>
        <div class=${
          this.state === "asia" ? "clicked" : ""
        } value="Asia">🌾Asia</div>
        <div class=${
          this.state === "Middle-East" ? "clicked" : ""
        }value="middle-East">🕌Middle-East</div>
        <div class=${
          this.state === "europe" ? "clicked" : ""
        }value="Europe">🥖Europe</div>
        <div class=${
          this.state === "latin-america" ? "clicked" : ""
        }value="Latin-America">💃Latin-America</div>
        <div class=${
          this.state === "africa" ? "clicked" : ""
        }value="Africa">🐘Africa</div>
        <div class=${
          this.state === "north-america" ? "clicked" : ""
        }value="North-America">🏈North-America</div>
        <div class=${
          this.state === "oceania" ? "clicked" : ""
        }value="Oceania">🏄Oceania</div>`;

    return temp;
  };
  this.render = () => {
    this.$target.innerHTML = this.template();
    document
      .getElementById("region-list")
      .addEventListener("click", (event) => {
        //this.handleRegion(event.currentTarget.value);
        console.log(event.currentTarget.value);
      });
  };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render();
}
  */
