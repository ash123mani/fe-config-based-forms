import { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { bool, object, string } from 'prop-types';
import camelCase from 'lodash/camelCase';

import SelectInputs from './select-inputs';
import './index.css';

const AddFieldName = ({
  onChangeFieldTypeClick,
  onAddField,
  loading,
  isEditing,
  config,
  onEditValidations,
  elementType
}) => {
  const [name, setName] = useState(config?.name || '');
  const [apiIdentifier, setApiIdentifier] = useState(name);
  const [listValues, setListItems] = useState(config?.dataFields || []);
  console.log('config', config);

  const handleSubmit = () => {
    onAddField({
      name,
      apiIdentifier,
      dataFields: listValues
    });
  };

  useEffect(() => {
    setApiIdentifier(camelCase(name));
  }, [name]);

  const handleAddItem = (value) => {
    setListItems([...listValues, value]);
  };

  return (
    <form className="add-field-name" onSubmit={handleSubmit}>
      <div className="add-field-inputs">
        <div className="add-fields-basic-info">
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

        {elementType === 'Select' && (
          <div>
            <h2>Add Default Values</h2>
            <SelectInputs handleAddItem={handleAddItem} items={listValues} />
          </div>
        )}
      </div>
      <Space align="end" className="field-name-buttons">
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
  onEditValidations() {},
  elementType: string.isRequired
};

AddFieldName.defaultProps = {
  config: {}
};

export default AddFieldName;
