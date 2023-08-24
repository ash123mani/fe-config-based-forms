import { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_NODE, GET_NODES } from '../../gql';

import AddNodeModal from './add-node-modal'
import Nodes from './nodes'
import './index.css';

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [addNode, { loading: loadingAddNode, error: errorAddNode }] = useMutation(ADD_NODE);
  const { loading: loadingNodes, error: errorNodes, data: dataNodes = {}  } = useQuery(GET_NODES);
  const [nodes, setAllNodes] = useState([]);

  useEffect(() => {
      setAllNodes(dataNodes?.nodes);
  }, [dataNodes]) 

  const handleAddNode = async (variables) => {
    const { data: { addNode: newNode } } = await addNode({ variables });
    setOpen(false);
    setAllNodes((prevNodes) => [newNode, ...prevNodes])
  }

  return (
    <div>
      <div className='admin-header'>
        <h1>Admin Panel</h1>
        <Button type="primary" onClick={() => setOpen(!open)} >+ Add Node Type</Button>
      </div>
      <Divider />
      <Nodes loading={loadingNodes} error={errorNodes} nodes={nodes} />
      <AddNodeModal handleAddNode={handleAddNode} handleCancel={() => setOpen(false)} error={errorAddNode} loading={loadingAddNode} open={open} />
    </div>
  )
}

export default AdminPanel;