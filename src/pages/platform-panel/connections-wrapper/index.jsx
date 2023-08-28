import React, { useRef, useState } from "react";
import { string } from 'prop-types';
import Xarrow from "react-xarrows";

import "./index.css";

const connectPointStyle = {
  position: "absolute",
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "black"
};
const connectPointOffset = {
  left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
  right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
  top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
  bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" }
};

const ConnectPointsWrapper = ({ boxId, handler }) => {
  const ref1 = useRef();

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);
  return (
    <React.Fragment>
      <div
        className="connectPoint"
        style={{
          ...connectPointStyle,
          ...connectPointOffset[handler],
          ...position
        }}
        draggable
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={(e) => {
          setPosition({
            position: "fixed",
            left: e.clientX,
            top: e.clientY,
            transform: "none",
            opacity: 0
          });
        }}
        ref={ref1}
        onDragEnd={() => {
          setPosition({});
          setBeingDragged(false);
        }}
      />
      {beingDragged ? <Xarrow start={boxId} end={ref1} /> : null}
    </React.Fragment>
  );
};

ConnectPointsWrapper.propTypes = {
  boxId: string.isRequired,
  handler: string
}

ConnectPointsWrapper.defaultProps = {
  handler: 'bottom'
}

export default ConnectPointsWrapper
