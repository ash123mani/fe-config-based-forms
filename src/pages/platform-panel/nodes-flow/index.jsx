import { useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import Xarrow from "react-xarrows";

import Box from '../draggable-box';
import './index.css'

export default function NodesFlow({ nodes, onClick }) {
  const [arrows, setArrows] = useState([]);

  console.log("arrows", arrows);

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  if(!nodes.length) return null;

  return (
    <div className='nodes-list'>
      {nodes.map((node) => {
        return (
          <Box
          key={node._id}
          text={node.name}
          onClick={() => onClick(node)}
          {...{ addArrow, setArrows, handler: "bottom", boxId: node.apiIdentifier }}
        />
        )
      })}
      {arrows.map((ar) => (
        <Xarrow
          start={ar.start}
          end={ar.end}
          key={ar.start + "-." + ar.start}
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
  onClick() {}
}

NodesFlow.defaultProps = {
  nodes: []
}