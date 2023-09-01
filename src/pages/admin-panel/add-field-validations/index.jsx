import { useState } from 'react';
import { Button, Space } from 'antd';
import { bool, object, string } from 'prop-types';

import './index.css';
import Required from './required';
import Patterns from './patterns';

const AddFieldValidations = ({ onConfirm, config, elementType }) => {
  const [required, setRequired] = useState({
    value: config.required || false,
    errorMsg: config.errorMsg || ''
  });
  const [pattern, setPattern] = useState({
    value: config?.pattern?.value || false,
    pattern: config?.pattern?.pattern || '',
    flags: config?.pattern?.flags || '',
    errorMsg: config?.pattern?.errorMsg || ''
  });

  const handleConfirm = () => {
    onConfirm({ required: required.value, errorMsg: required.errorMsg, pattern });
  };

  const handlePatternChange = (value) => {
    setPattern((prevPatt) => {
      return {
        ...prevPatt,
        pattern: value
      };
    });
  };

  const renderRequired = () => {
    return (
      <Required
        onTextChange={(e) =>
          setRequired((prevReq) => {
            return {
              ...prevReq,
              value: e.target.checked
            };
          })
        }
        onErrorChange={(e) => {
          setRequired((prevReq) => {
            return {
              ...prevReq,
              errorMsg: e.target.value
            };
          });
        }}
        required={required}
        config={config}
      />
    );
  };

  const renderPattern = () => {
    return (
      <Patterns
        config={config}
        pattern={pattern}
        onChange={(e) => {
          setPattern((prevReq) => {
            return {
              ...prevReq,
              value: e.target.checked
            };
          });
        }}
        onPatternChange={handlePatternChange}
        onErrorChange={(e) => {
          setPattern((prevPatt) => {
            return {
              ...prevPatt,
              errorMsg: e.target.value
            };
          });
        }}
      />
    );
  };

  return (
    <form onSubmit={handleConfirm} className="validations-form">
      <Space direction="vertical" className="validations">
        {renderRequired()}
        {elementType !== 'Select' && renderPattern()}
      </Space>
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </form>
  );
};

AddFieldValidations.propTypes = {
  onConfirm() {},
  isEditing: bool,
  config: object,
  type: string,
  elementType: string.isRequired
};

AddFieldValidations.defaultProps = {
  isEditing: false,
  config: {},
  type: ''
};
export default AddFieldValidations;
