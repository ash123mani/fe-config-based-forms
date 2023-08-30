import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Divider, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

import { GET_NODES, GET_NODE_FIELDS } from '../../gql';
import NodesFlow from './nodes-flow';
import Elements from './elements';
import './index.css';

const PlatformPanel = () => {
  const { data: dataNodes = {}, loading: loadingNodes } = useQuery(GET_NODES);
  const [getNodeFields, { data: dataNodeFields = {}, loading: loadingNodeField }] = useLazyQuery(GET_NODE_FIELDS);

  const [testNodes, setTestNodes] = useState({
    'all-nodes': [],
    'map-nodes': []
  });
  const [arrows, setArrows] = useState([]);

  useEffect(() => {
    const newArrows = [];
    for (let i = 0; i < testNodes['map-nodes'].length; i++) {
      if (i !== testNodes['map-nodes'].length - 1) {
        newArrows.push({
          start: testNodes['map-nodes'][i].apiIdentifier,
          end: testNodes['map-nodes'][i + 1].apiIdentifier
        });
      }
      setArrows(newArrows);
    }
  }, [testNodes]);

  useEffect(() => {
    setTestNodes((prevNodes) => {
      return {
        ...prevNodes,
        'all-nodes': dataNodes?.nodes || []
      };
    });
  }, [dataNodes]);

  const handleNodeClick = async (node) => {
    await getNodeFields({ variables: { nodeId: node._id } });
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.draggableId === source.draggableId && destination.index === source.index) return;

    if (source.droppableId === destination.droppableId) {
      let sourceNodes = testNodes[source.droppableId] || [];

      const newSourceNodes = Array.from(sourceNodes);

      const filterdNode = newSourceNodes.filter((n) => n.apiIdentifier === draggableId)[0];

      newSourceNodes.splice(source.index, 1);
      newSourceNodes.splice(destination.index, 0, filterdNode);

      setTestNodes((prevNodes) => {
        return {
          ...prevNodes,
          [source.droppableId]: newSourceNodes
        };
      });
    } else {
      let sourceNodes = testNodes[source.droppableId] || [];
      let destNodes = testNodes[destination.droppableId] || [];

      const newSourceNodes = Array.from(sourceNodes);
      const newDestNodes = Array.from(destNodes);

      const filterdNode = sourceNodes.filter((n) => n.apiIdentifier === draggableId)[0];

      newSourceNodes.splice(source.index, 1);
      newDestNodes.splice(destination.index, 0, filterdNode);

      setTestNodes((prevNodes) => {
        return {
          ...prevNodes,
          [source.droppableId]: newSourceNodes,
          [destination.droppableId]: newDestNodes
        };
      });
    }
  };

  return (
    <div className="platform-panel">
      <Space size="large">
        <Button type="dashed">
          <strong>Platform Panel</strong>
        </Button>

        <Link to="/admin">
          <Button type="lik">Admin</Button>
        </Link>

        <Link to="/">
          <Button type="lik">Home</Button>
        </Link>
      </Space>

      <Divider />

      <div className="platform-sections">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="nodes-flow-section">
            {loadingNodes ? (
              <strong>Loading Nodes...</strong>
            ) : (
              <Droppable droppableId="all-nodes">
                {(provided) => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <NodesFlow nodes={testNodes['all-nodes']} onClick={handleNodeClick} />
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            )}

            <Divider type="vertical" style={{ height: '100%' }} />

            <Droppable droppableId="map-nodes">
              {(provided, snap) => {
                console.log('provided', provided);
                return (
                  <div className="dnd-area">
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <h3>Drag Nodes here to map</h3>
                      <NodesFlow
                        nodes={testNodes['map-nodes']}
                        onClick={handleNodeClick}
                        newArrows={arrows}
                        isDraggingOver={snap.isDraggingOver}
                      />
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          </div>
        </DragDropContext>

        <Divider type="vertical" style={{ height: '100%' }} />

        <div className="form-section" id="forms-section">
          <h3>Form</h3>
          {loadingNodeField ? (
            <strong>Loading Fields...</strong>
          ) : dataNodeFields?.nodeFields?.length ? (
            <Elements fields={dataNodeFields?.nodeFields} />
          ) : (
            <strong>No config found</strong>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformPanel;
