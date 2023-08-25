import { Button } from 'antd';
import { bool, shape, arrayOf, string } from 'prop-types';

import './index.css';

const Nodes = ({ loading, error, nodes, handleNodeClick }) => {

  if (loading) return <h2>Loading Nodes List...</h2>;

  if (error) return <div>Error! ${error.message}</div>;

  return (
    <div className='nodes'>
      <h2>Node List</h2>
      <div className='node-list'>
      {nodes.length ? nodes.map((node) => {
        return (
          <div key={node._id}>
            <Button onClick={() =>handleNodeClick(node) }>{node.displayName}</Button>
          </div>
        )
      }): <div>No Node Found</div>}
      </div>
    </div>
  )
}

Nodes.propTypes = {
  loading: bool,
  error: shape({
    message: string
  }),
  nodes: arrayOf(shape({
    name: string,
    displayName: string,
    _id: string
  })),
  handleNodeClick() {}
}

Nodes.defaultProps = {
  nodes: [],
  error: null,
  loading: false
}

export default Nodes