import React, { Component } from "react";
import { connect } from "react-redux";

import { setLanguage } from "../actions";

export class GreyOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageSelected: false
    };
  }
  languageBtnClicked = (language) => {
    this.props.setLanguage(language);
    this.setState({ languageSelected: true });
  };
  render() {
    return (
      <div className="grey-overlay" style={{ display: this.state.languageSelected ? "none" : "flex" }}>
        <div className="language-selection-container">
          <div className="text">Pasirinkite kalbą:</div>
          <div className="btn-container">
            <div className="btn btn-language-lt" onClick={() => this.languageBtnClicked("lithuanian")}>
              LT
            </div>
            <div className="btn btn-language-en" onClick={() => this.languageBtnClicked("english")}>
              EN
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GreyOverlay);
