import { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

import { ADD_NODE, GET_NODES, GET_NODE_FIELDS } from '../../gql';

import AddNodeModal from './add-node-modal';
import NodesFieldDrawer from './add-fields-drawer';
import Nodes from './nodes';
import NodesConfig from './nodes-config';
import './index.css';

const AdminPanel = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [addNode, { loading: loadingAddNode, error: errorAddNode }] = useMutation(ADD_NODE);
  const { loading: loadingNodes, error: errorNodes, data: dataNodes = {} } = useQuery(GET_NODES);
  const [getNodeFields, { data: dataNodeFields = {}, loading: loadingNodeField }] = useLazyQuery(GET_NODE_FIELDS);
  const [nodes, setAllNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNodeConfig, setEditNodeConfig] = useState({});

  useEffect(() => {
    setAllNodes(dataNodes?.nodes);
  }, [dataNodes]);

  const handleAddNode = async (variables) => {
    const {
      data: { addNode: newNode }
    } = await addNode({ variables });
    setOpenModal(false);
    setAllNodes((prevNodes) => [newNode, ...prevNodes]);
    setIsEditing(false);
  };

  const handleNodeClick = async (node) => {
    setSelectedNode(node);
    await getNodeFields({ variables: { nodeId: node._id } });
  };

  const handleEdit = (field) => {
    setIsEditing(true);
    setOpenDrawer(true);
    setEditNodeConfig(field);
  };

  console.log('editNodeConfig', editNodeConfig);
  return (
    <main>
      <AddNodeModal
        error={errorAddNode}
        loading={loadingAddNode}
        open={openModal}
        handleAddNode={handleAddNode}
        handleCancel={() => setOpenModal(false)}
      />

      <section className="admin-header">
        <h1>Admin Panel</h1>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          + Add Node Type
        </Button>
      </section>

      <Divider />
      <Nodes loading={loadingNodes} error={errorNodes} nodes={nodes} handleNodeClick={handleNodeClick} />
      <Divider />

      <section>
        <div>
          {!selectedNode ? (
            <h3>Select node to see types for it</h3>
          ) : (
            <div>
              <div className="select-node-header">
                <h2>Fields for {selectedNode.name}</h2>
                <Button type="primary" onClick={() => setOpenDrawer(true)}>
                  + Add Field to {selectedNode.name}
                </Button>
              </div>
              {loadingNodeField ? (
                <h3>Loading Node Fields... </h3>
              ) : (
                <NodesConfig fields={dataNodeFields?.nodeFields} onEdit={handleEdit} />
              )}
              <NodesFieldDrawer
                open={openDrawer}
                handleClose={() => {
                  console.log('calling close');
                  setIsEditing(false);
                  setOpenDrawer(false);
                  setEditNodeConfig({});
                }}
                selectedNode={selectedNode}
                isEditing={isEditing}
                editNodeConfig={editNodeConfig}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;
