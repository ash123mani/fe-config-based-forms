import Draggable from "react-draggable";
import { string } from 'prop-types'

import ConnectPointsWrapper from '../connections-wrapper';

const boxStyle = {
  border: "1px solid #E0E0E0",
  position: "relative",
  padding: "12px",
  height: 'fit-content',
  borderRadius: '4px'
};

const Box = ({ text, handler, addArrow, setArrows, boxId, onClick }) => {
  return (
    <Draggable onDrag={() => setArrows((arrows) => [...arrows])} bounds="parent">
      <div
        onClick={onClick}
        id={boxId}
        style={boxStyle}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (e.dataTransfer.getData("arrow") === boxId) {
            console.log(e.dataTransfer.getData("arrow"), boxId);
          } else {
            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
            addArrow(refs);
            console.log("droped!", refs);
          }
        }}
      >
        {text}
        <ConnectPointsWrapper {...{ boxId, handler }} />
      </div>
    </Draggable>
  );
};

Box.propTypes = {
  text: string.isRequired,
  handler: string.isRequired,
  addArrow() {},
  setArrows() {},
  boxId: string.isRequired,
  onClick() {}
}

Box.defaultProps = {
  handler: 'bottom'
}

export default Box