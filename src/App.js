import React from "react";

import InteractiveMap from "./components/InteractiveMap";
import GreyOverlay from "./components/GreyOverlay";

// "homepage": "http://https://robertasliekis.github.io/kernave/",

function App() {
  return (
    <div className="App">
      <div className="overflow-wrapper">
        {/* <GreyOverlay /> */}
        <div className="website-wrapper">
          <InteractiveMap />
        </div>
      </div>
    </div>
  );
}

export default App;
