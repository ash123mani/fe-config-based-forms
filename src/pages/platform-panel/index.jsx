import { useQuery, useLazyQuery } from '@apollo/client';
// import { useState } from 'react';
import { Divider } from 'antd';

import NodesFlow from './nodes-flow';
import Elements from './elements'
import { GET_NODES, GET_NODE_FIELDS } from '../../gql';
import './index.css';

const PlatformPanel = () => {
  const { data: dataNodes = {} } = useQuery(GET_NODES);
  const [getNodeFields, { data: dataNodeFields = {} }] = useLazyQuery(GET_NODE_FIELDS);
  // const [currentForm, setCurrentForm] = useState({});
  // const [flowConfig, setFlowConfig] = useState({});

  const handleNodeClick = async (node) => {
     await getNodeFields({ variables: { nodeId: node._id }})
  }

  return (
    <div className='platform-panel'>
      <h2>PlatformPanel</h2>

      <Divider />

      <div className='platform-sections'>
        <div className='nodes-flow-section'>
          <NodesFlow nodes={dataNodes.nodes} onClick={handleNodeClick}/>
        </div>
        <Divider type="vertical" style={{ height: '100%' }}/>
        <div className='form-section'>
          <Elements fields={dataNodeFields?.nodeFields} />
        </div>
      </div>
    </div>
  )
}

export default PlatformPanel;