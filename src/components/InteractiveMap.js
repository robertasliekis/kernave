import React, { Component } from "react";

const legendIconNames = [
  "aktyvus taškas",
  "Kernavės archeologinės vietovės muziejus",
  "Senosios bažnyčios vieta",
  "XIII - XIV a. amatininkų kiemai",
  "Senojo Kernavės miesto vieta",
  "Kernavės dvarvietė",
  "XIII - XIV a. kapinynas",
  "Romėniškojo laikotarpio gyvenvietės ir pilkapynas",
  "Neolito gyvenvietės",
  "Akmens amžiaus stovyklavietės"
];

const activeIcons = [
  ["vieta", 8],
  ["vieta", 30],
  ["vieta", 60],
  ["vieta", 100],
  ["vieta", 150],
  ["vieta", 10],
  ["vieta", 250],
  ["vieta", 300]
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
        <h1 className="map-title">Vilniaus Vlastybinio Kernavės kultūrinio rezervato žemėlapis</h1>
        <div className="map-images-container">
          <div className="map-image image"></div>
          <div className="river-image image"></div>
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
                <div className="name">{legendIconName}</div>
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
                      transform: `rotate(${activeIcon[1]}deg)`
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
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default InteractiveMap;
