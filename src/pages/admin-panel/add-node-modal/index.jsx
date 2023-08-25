import { useState, useEffect } from 'react';
import { string, shape, bool } from 'prop-types';
import { Modal, Input, Alert } from 'antd';

import { toCamelCase } from '../../../utils'

const AddNodeModal = ({ handleAddNode, handleCancel, error, loading, open }) => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState(name);

  useEffect(() => {
    setName(toCamelCase(displayName))
  }, [displayName])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNode({ name, displayName })
  }

  return (
    <Modal
      title="Create new node type"
      centered
      open={open}
      onOk={() => handleAddNode({ name, displayName })}
      onCancel={handleCancel}
      width={1000}
      okText="Submit"
      confirmLoading={loading}
    >
      {error && <Alert message={`Submission error! ${error.message}`} type="error" style={{ marginBottom: '20px' }} closable />}

      <form onSubmit={handleSubmit}>
        <Input placeholder="Name" size='large' onChange={(e) => setDisplayName(e.target.value)} />
        <br />
        <br />
        <Input
          placeholder="Api Identifier"
          size='large'
          onChange={(e) => setDisplayName(e.target.value)}
          value={name}
        />
      </form>
    </Modal>
  )
}

AddNodeModal.propTypes = {
  handleAddNode: () => { },
  handleCancel: () => { },
  error: shape({
    message: string
  }),
  loading: bool,
  open: bool
}

export default AddNodeModal;