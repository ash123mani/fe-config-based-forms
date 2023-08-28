import { string, number } from 'prop-types'
import { Draggable } from 'react-beautiful-dnd';

import ConnectPointsWrapper from '../connections-wrapper';
import './index.css';


const Box = ({ text, handler, setArrows, boxId, onClick, index }) => {
  return (
    <Draggable draggableId={boxId} onDrag={() => setArrows((arrows) => [...arrows])} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={onClick}
            className='dnd-node'
          >
            {text}
            <ConnectPointsWrapper {...{ boxId, handler }} />
          </div>
        )
      }}

    </Draggable>
  );
};

Box.propTypes = {
  text: string.isRequired,
  handler: string.isRequired,
  addArrow() { },
  setArrows() { },
  boxId: string.isRequired,
  onClick() { },
  index: number.isRequired
}

Box.defaultProps = {
  handler: 'bottom'
}

export default Box