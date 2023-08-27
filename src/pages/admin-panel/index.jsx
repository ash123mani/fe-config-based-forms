import { useEffect, useState } from 'react';
import { Button, Divider, Watermark } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_NODE, GET_NODES } from '../../gql';

import AddNodeModal from './add-node-modal'
import NodesFieldDrawer from './add-fields-drawer';
import Nodes from './nodes'
import './index.css';

const AdminPanel = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [addNode, { loading: loadingAddNode, error: errorAddNode }] = useMutation(ADD_NODE);
  const { loading: loadingNodes, error: errorNodes, data: dataNodes = {} } = useQuery(GET_NODES);
  const [nodes, setAllNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    setAllNodes(dataNodes?.nodes);
  }, [dataNodes])

  const handleAddNode = async (variables) => {
    const { data: { addNode: newNode } } = await addNode({ variables });
    setOpenModal(false);
    setAllNodes((prevNodes) => [newNode, ...prevNodes])
  }

  const handleNodeClick = (node) => setSelectedNode(node)

  return (
    <main>
      <AddNodeModal error={errorAddNode} loading={loadingAddNode} open={openModal} handleAddNode={handleAddNode} handleCancel={() => setOpenModal(false)} />

      <section className='admin-header'>
        <h1>Admin Panel</h1>
        <Button type="primary" onClick={() => setOpenModal(true)} >+ Add Node Type</Button>
      </section>

      <Divider />
      <Nodes loading={loadingNodes} error={errorNodes} nodes={nodes} handleNodeClick={handleNodeClick} />
      <Divider />

      <section>
        <div>
          {!selectedNode ? <h3>Select node to see types for it</h3> : <div>
            <div className='select-node-header'>
              <h2>Fields for {selectedNode.displayName}</h2>
              <Button type="primary" onClick={() => setOpenDrawer(true)}>+ Add Field to {selectedNode.displayName}</Button>
            </div>
            <Watermark content={['No Field Present', selectedNode.displayName]}>
              <div style={{ height: 200 }} />
            </Watermark>
            <NodesFieldDrawer open={openDrawer} handleClose={() => setOpenDrawer(false)} selectedNode={selectedNode} />
          </div>}
        </div>
      </section>
    </main>
  )
}

export default AdminPanel;