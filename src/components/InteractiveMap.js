import React, { Component } from "react";
import { connect } from "react-redux";

import { setLanguage } from "../actions";

const legendIconNames = [
  ["aktyvus taškas", "active point"],
  ["Kernavės archeologinės vietovės muziejus", "Archeological museum"],
  ["Senosios bažnyčios vieta", "Old church"],
  ["XIII - XIV a. amatininkų kiemai", "XIII - XIV century house"],
  ["Senojo Kernavės miesto vieta", "Old city place"],
  ["Kernavės dvarvietė", "another place"],
  ["XIII - XIV a. kapinynas", "XIII - XIV century cemetary"],
  ["Romėniškojo laikotarpio gyvenvietės ir pilkapynas", "Old stuff"],
  ["Neolito gyvenvietės", "More places"],
  ["Akmens amžiaus stovyklavietės", "Stoneage place"]
];

const mapTitle = ["Vilniaus Vlastybinio Kernavės kultūrinio rezervato žemėlapis", "Map of Vilnius State Kernavė Cultural Reserve"];

const activeIcons = [
  ["Lokacija 1", "Location 1", 8],
  ["Lokacija 2", "Location 2", 30],
  ["Lokacija 3", "Location 3", 60],
  ["Lokacija 4", "Location 4", 100],
  ["Lokacija 5", "Location 5", 150],
  ["Lokacija 6", "Location 6", 10],
  ["Lokacija 7", "Location 7", 250],
  ["Lokacija 8", "Location 8", 300]
];

export class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIconHovered: false,
      activeIconIndex: 0
    };
    this.activeIconsRefs = {};
    this.audioAboutRef = React.createRef();
  }

  mouseEnterActiveIcon = (ref) => {
    console.log(ref);
    this.setState({ activeIconHovered: true, activeIconIndex: ref });
  };

  mouseLeaveActiveIcon = () => {
    this.setState({ activeIconHovered: false });
  };

  languageBtnClicked = (language) => {
    this.props.setLanguage(language);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeIconHovered !== prevState.activeIconHovered || this.state.activeIconIndex !== prevState.activeIconIndex) {
      this.activeIconsRefs[this.state.activeIconIndex].classList.remove("active-icon-stop");
      this.activeIconsRefs[prevState.activeIconIndex].classList.remove("active-icon-stop");
      if (this.state.activeIconHovered) {
        this.activeIconsRefs[this.state.activeIconIndex].classList.add("active-icon-stop");
      }
    }
  }

  render() {
    return (
      <div className="interactive-map-container">
        <div className="languages-container">
          <div
            className="btn btn-language-lt"
            onClick={() => this.languageBtnClicked("lithuanian")}
            style={{ border: this.props.language === "lithuanian" ? "3px solid black" : "none" }}
          >
            LT
          </div>
          <div
            className="btn btn-language-en"
            onClick={() => this.languageBtnClicked("english")}
            style={{ border: this.props.language === "english" ? "3px solid black" : "none" }}
          >
            EN
          </div>
        </div>
        <h1 className="map-title">{this.props.language === "lithuanian" ? mapTitle[0] : mapTitle[1]}</h1>
        <div className="map-images-container">
          <div className="river-image image"></div>
          <div className="map-image image"></div>
        </div>
        <div className="legend-container">
          {legendIconNames.map((legendIconName, index) => {
            return (
              <div className="legend-item" key={index}>
                <div className="icon-container">
                  <div
                    className="icon"
                    style={{
                      backgroundImage: `url("./images/Asset ${index + 2}.png")`
                    }}
                  ></div>
                </div>
                <div className="name">{this.props.language === "lithuanian" ? legendIconName[0] : legendIconName[1]}</div>
              </div>
            );
          })}
        </div>
        <div className="active-icons-container">
          {activeIcons.map((activeIcon, index) => {
            return (
              <div
                className="active-icon"
                key={index}
                ref={(ref) => {
                  this.activeIconsRefs[index] = ref;
                }}
                onMouseEnter={() => this.mouseEnterActiveIcon(index)}
                onMouseLeave={() => this.mouseLeaveActiveIcon()}
              >
                <div className="icon-scale">
                  <div
                    className="icon-rotation"
                    style={{
                      transform: `rotate(${activeIcon[2]}deg)`
                    }}
                  >
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("./images/icon-spinning.png")`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="icon-title">{this.props.language === "lithuanian" ? activeIcon[0] : activeIcon[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.setLanguage.language
  };
};

const mapDispatchToProps = {
  setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
