import { string, number } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import './index.css';

const Box = ({ text, boxId, onClick, index }) => {
  return (
    <Draggable draggableId={boxId} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={onClick}
            className="dnd-node"
            id={boxId}
          >
            {text}
          </div>
        );
      }}
    </Draggable>
  );
};

Box.propTypes = {
  text: string.isRequired,
  boxId: string.isRequired,
  onClick() {},
  index: number.isRequired
};

export default Box;
