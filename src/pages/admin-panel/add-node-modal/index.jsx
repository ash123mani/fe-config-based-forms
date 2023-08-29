import { useState, useEffect } from 'react';
import { string, shape, bool } from 'prop-types';
import { Modal, Input, Alert } from 'antd';

import { toCamelCase } from '../../../utils';

const AddNodeModal = ({ handleAddNode, handleCancel, error, loading, open }) => {
  const [name, setName] = useState('');
  const [apiIdentifier, setApiIdentifier] = useState();

  useEffect(() => {
    setApiIdentifier(toCamelCase(name));
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddNode({ name, apiIdentifier });
    setName('');
    setApiIdentifier('');
  };

  return (
    <Modal
      title="Create new node type"
      centered
      open={open}
      onOk={() => handleAddNode({ name, apiIdentifier })}
      onCancel={handleCancel}
      width={1000}
      okText="Submit"
      confirmLoading={loading}
    >
      {error && (
        <Alert message={`Submission error! ${error.message}`} type="error" style={{ marginBottom: '20px' }} closable />
      )}

      <form onSubmit={handleSubmit}>
        <Input placeholder="Name" size="large" onChange={(e) => setName(e.target.value)} />
        <br />
        <br />
        <Input
          placeholder="Api Identifier"
          size="large"
          onChange={(e) => setApiIdentifier(e.target.value)}
          value={apiIdentifier}
        />
      </form>
    </Modal>
  );
};

AddNodeModal.propTypes = {
  handleAddNode: () => {},
  handleCancel: () => {},
  error: shape({
    message: string
  }),
  loading: bool,
  open: bool
};

export default AddNodeModal;
