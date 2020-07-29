import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import "./App.css";
import Starship from "./Starship";

const wormholeB = document.querySelector(".wormhole-b-container");

const overlaps = (rect1, rect2) =>
  !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );

function App() {
  const [isInSpaceA, setIsInSpaceA] = useState(true);
  const wormholeARef = useRef();
  const wormholeBRef = useRef();
  const checkInsideWorkmholeA = (event) => {
    if (
      overlaps(
        event.target.getBoundingClientRect(),
        wormholeARef.current.getBoundingClientRect()
      )
    ) {
      setIsInSpaceA(false);
    }
  };
  const checkInsideWorkmholeB = (event) => {
    if (
      overlaps(
        event.target.getBoundingClientRect(),
        wormholeBRef.current.getBoundingClientRect()
      )
    ) {
      setIsInSpaceA(true);
    }
  };
  return (
    <div className="App">
      {isInSpaceA && (
        <Draggable axis="both" bounds="parent" onStop={checkInsideWorkmholeA}>
          <Starship />
        </Draggable>
      )}
      <div className="wormhole-a" ref={wormholeARef} />
      {!isInSpaceA &&
        ReactDOM.createPortal(
          <Draggable axis="both" bounds="parent" onStop={checkInsideWorkmholeB}>
            <Starship />
          </Draggable>,
          wormholeB
        )}
      {ReactDOM.createPortal(
        <div className="wormhole-b" ref={wormholeBRef}></div>,
        wormholeB
      )}
    </div>
  );
}

export default App;
