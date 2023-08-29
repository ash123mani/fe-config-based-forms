import { arrayOf, shape, string, bool } from 'prop-types';
import Xarrow from "react-xarrows";

import Box from '../draggable-box';
import './index.css'

export default function NodesFlow({ nodes, onClick, newArrows, isDraggingOver }) {


  if (!nodes.length) return <h3>No Node Found</h3>;

  return (
    <div className='nodes-list'>
      <h3>Nodes</h3>
      {nodes.map((node, index) => {
        return (
          <Box
            key={node._id}
            text={node.name}
            onClick={() => onClick(node)}
            index={index}
            boxId={node.apiIdentifier}
          />
        )
      })}
      {!isDraggingOver && !!newArrows?.length && newArrows.map((ar) => (
        <Xarrow
          start={ar.start}
          end={ar.end}
          key={ar.start + "-." + ar.start}
          curveness='1'
        />
      ))}
    </div>
  );
}

NodesFlow.propTypes = {
  nodes: arrayOf(shape({
    name: string,
    apiIdentifier: string,
    _id: string
  })),
  onClick() { },
  newArrows: arrayOf(shape({
    name: string,
    apiIdentifier: string,
    _id: string
  })),
  isDraggingOver: bool
}

NodesFlow.defaultProps = {
  nodes: [],
  newArrows: [],
  isDraggingOver: false
}