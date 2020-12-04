import React, { Component } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { connect } from "react-redux";

import { setLanguage } from "../actions";

const legendIconNames = [
  ["Aktyvus taškas", "Active point"],
  ["Kernavės archeologinės vietovės muziejus", "Archeological museum"],
  ["Senosios bažnyčios vieta", "Old church"],
  ["XIII - XIV a. amatininkų kiemai", "XIII - XIV century house"],
  ["Senojo Kernavės miesto vieta", "Old city place"],
  ["Kernavės dvarvietė", "Another place"],
  ["XIII - XIV a. kapinynas", "XIII - XIV century cemetary"],
  ["Romėniškojo laikotarpio gyvenvietės ir pilkapynas", "Old stuff"],
  ["Neolito gyvenvietės", "More places"],
  ["Akmens amžiaus stovyklavietės", "Stoneage place"]
];

const activeIcons = [
  ["Baltasis kalnas", "Location 1", 8],
  ["Kernavės amatininkų kiemų rekonstrukcijos", "Location 2", 30],
  ["Senosios bažnyčios vieta", "Location 3", 60],
  ["Viduramžių įtvirtinto Kernavės miesto liekanos", "Location 4", 100],
  ["Medgrinda", "Location 5", 150],
  ["Kernavės nekropolis", "Location 6", 10],
  ["Kernavės kapinynas", "Location 7", 250],
  ["Semeniškių kapinynas ir gyvenvietė", "Location 8", 300]
];

const mapText = {
  mapTitle: ["Vilniaus Valstybinio Kernavės kultūrinio rezervato žemėlapis", "Map of Vilnius State Kernavė Cultural Reserve"],
  legendTitle: ["Legenda", "Legend"],
  buttonClose: ["Uždaryti", "Close"],
  virtualTourWarning: ["Jūs įeinate į 360 virtualų turą", "You are entering 360 virtual tour"],
  buttonConfirm: ["Įeiti", "Enter"]
};

export class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconHovered: false,
      iconHoveredIndex: 0,
      iconClickedIndex: 0,
      virtualTourWarningOpen: false,
      virtualTourOpen: false
    };
    this.activeIconsRefs = {};
    this.audioAboutRef = React.createRef();
    this.iframeRef = React.createRef();
  }

  mouseEnterActiveIcon = (index) => {
    this.setState({ iconHovered: true, iconHoveredIndex: index });
  };

  mouseLeaveActiveIcon = () => {
    this.setState({ iconHovered: false });
  };

  mouseClickActiveIcon = (index) => {
    const initialState = this.state.virtualTourWarningOpen;
    this.setState({ virtualTourWarningOpen: !initialState, iconClickedIndex: index });
  };

  mouseClickEnterVR = () => {
    const initialState = this.state.virtualTourOpen;
    console.log(initialState);
    if (initialState) {
      document.webkitExitFullscreen();
    } else {
      this.iframeRef.current.requestFullscreen();
    }
    this.setState({ virtualTourOpen: !initialState });
  };

  languageBtnClicked = (language) => {
    this.props.setLanguage(language);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.iconHovered !== prevState.iconHovered || this.state.iconHoveredIndex !== prevState.iconHoveredIndex) {
      this.activeIconsRefs[this.state.iconHoveredIndex].classList.remove("active-icon-stop");
      this.activeIconsRefs[prevState.iconHoveredIndex].classList.remove("active-icon-stop");
      for (let i = 0; i < 8; i++) {
        this.activeIconsRefs[i].classList.remove("icons-stop");
      }
      if (this.state.iconHovered) {
        this.activeIconsRefs[this.state.iconHoveredIndex].classList.add("active-icon-stop");
        for (let i = 0; i < 8; i++) {
          this.activeIconsRefs[i].classList.add("icons-stop");
        }
      }
    }
  }

  render() {
    const buttonLanguageLtClass = this.props.language === "lithuanian" ? "button-language-clicked" : "";
    const buttonLanguageEnClass = this.props.language === "english" ? "button-language-clicked" : "";
    return (
      <div className="interactive-map-container">
        <div className="languages-container">
          <div className={`btn btn-language-lt + ${buttonLanguageLtClass}`} onClick={() => this.languageBtnClicked("lithuanian")}>
            LT
          </div>
          <div className={`btn btn-language-en + ${buttonLanguageEnClass}`} onClick={() => this.languageBtnClicked("english")}>
            EN
          </div>
        </div>
        {/* <h1 className="map-title">{mapText.mapTitle[this.props.languageIndex]}</h1> */}
        <div className="map-images-container">
          <div className="river-image image"></div>
          <div className="map-image image"></div>
        </div>
        <div className="legend-container">
          <div className="legend-title">{mapText.legendTitle[this.props.languageIndex]}</div>
          <div className="icons-container">
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
                  <div className="name">{legendIconName[this.props.languageIndex]}</div>
                </div>
              );
            })}
          </div>
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
                onClick={() => this.mouseClickActiveIcon(index)}
              >
                <div className="icon-scale">
                  <div
                    className="icon-rotation"
                    style={
                      {
                        //  transform: `rotate(${activeIcon[2]}deg)`
                      }
                    }
                  >
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url("./images/icon-spinning.png")`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="icon-title">{activeIcon[this.props.languageIndex]}</div>
              </div>
            );
          })}
        </div>
        <div className="warning-screen-container" style={{ display: this.state.virtualTourWarningOpen ? "flex" : "none" }}>
          <div className="warning-screen-content">
            <div className="btn btn-close" onClick={() => this.mouseClickActiveIcon()}>
              {mapText.buttonClose[this.props.languageIndex]}
            </div>
            <div className="warning-text">{mapText.virtualTourWarning[this.props.languageIndex]}</div>
            <div
              className="btn btn-confirm"
              onClick={() => {
                this.mouseClickEnterVR();
                this.mouseClickActiveIcon();
              }}
            >
              {mapText.buttonConfirm[this.props.languageIndex]}
            </div>
          </div>
        </div>
        <div
          className="modal-window-container"
          ref={this.iframeRef}
          allowFullScreen
          style={{ display: this.state.virtualTourOpen ? "flex" : "none" }}
        >
          <div className="modal-window-content">
            <div className="btn btn-close" onClick={() => this.mouseClickEnterVR()}>
              {mapText.buttonClose[this.props.languageIndex]}
            </div>
            <div className="virtual-reality-frame-container">
              <iframe
                src={this.state.virtualTourOpen ? "https://www.3dvista.com/samples/real_estate_virtual_tour.html" : ""}
                title="virtual tour"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.setLanguage.language,
    languageIndex: state.setLanguage.languageIndex
  };
};

const mapDispatchToProps = {
  setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
