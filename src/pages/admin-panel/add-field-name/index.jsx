import { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { bool, object } from 'prop-types';

import { toCamelCase } from '../../../utils';

import './index.css';

const AddFieldName = ({ onChangeFieldTypeClick, onAddField, loading, isEditing, config, onEditValidations }) => {
  const [name, setName] = useState('');
  const [apiIdentifier, setApiIdentifier] = useState(name);

  const handleSubmit = () => {
    onAddField({
      name,
      apiIdentifier
    });
    console.log('apiIdentifier', apiIdentifier);
  };

  useEffect(() => {
    setApiIdentifier(toCamelCase(name));
  }, [name]);

  return (
    <form className="add-field-name" onSubmit={handleSubmit}>
      <div>
        <h2>Add Field</h2>
        <Input
          placeholder="Name (Label)"
          size="large"
          onChange={(e) => setName(e.target.value)}
          value={name || config.name}
        />
        <br />
        <br />
        <Input
          placeholder="Api Identifier"
          size="large"
          onChange={(e) => setApiIdentifier(e.target.value)}
          value={apiIdentifier || config.apiIdentifier}
        />
      </div>
      <Space align="end">
        {isEditing ? (
          <Button onClick={onEditValidations}>Edit Validations</Button>
        ) : (
          <Button onClick={onChangeFieldTypeClick}>Change Field Type</Button>
        )}
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          {isEditing ? 'Edit' : 'Add'} and Configure
        </Button>
      </Space>
    </form>
  );
};

AddFieldName.propTypes = {
  onFieldSelect() {},
  onChangeFieldTypeClick() {},
  onAddField() {},
  loading: bool,
  isEditing: bool,
  config: object,
  onEditValidations() {}
};

AddFieldName.defaultProps = {
  config: {}
};

export default AddFieldName;
