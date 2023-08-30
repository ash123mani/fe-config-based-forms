import { useState } from 'react';
import { Button, Checkbox, Input, Space, Select } from 'antd';
import { bool, object, string } from 'prop-types';

import './index.css';
import { patterns } from './config';

const AddFieldValidations = ({ onConfirm, config }) => {
  console.log('config', config);
  const [required, setRequired] = useState({
    value: config.required || false,
    errorMsg: config.errorMsg
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
    console.log('value', value);
    setPattern((prevPatt) => {
      return {
        ...prevPatt,
        pattern: value
      };
    });
  };

  const renderRequired = () => {
    return (
      <Space direction="vertical" style={{ display: 'flex' }} size="middle">
        <Checkbox
          onChange={(e) =>
            setRequired((prevReq) => {
              return {
                ...prevReq,
                value: e.target.checked
              };
            })
          }
          checked={required.value}
        >
          Required
        </Checkbox>
        {required.value && (
          <Input
            placeholder="Error Message"
            size="large"
            value={required.errorMsg || config?.errorMsg}
            onChange={(e) => {
              setRequired((prevReq) => {
                return {
                  ...prevReq,
                  errorMsg: e.target.value
                };
              });
            }}
          />
        )}
      </Space>
    );
  };

  const renderPattern = () => {
    return (
      <Space direction="vertical" style={{ display: 'flex' }} size="middle">
        <Space size="middle">
          <Checkbox
            onChange={(e) =>
              setPattern((prevReq) => {
                return {
                  ...prevReq,
                  value: e.target.checked
                };
              })
            }
            checked={pattern.value}
          >
            Match a specific pattern
          </Checkbox>
          {pattern.value && (
            <Select
              defaultValue={config?.pattern?.pattern || ''}
              style={{ width: 120 }}
              placeholder="Enter a pattern"
              onChange={handlePatternChange}
              options={patterns.text}
            />
          )}
        </Space>
        {pattern.value && (
          <Input
            placeholder="Error Message"
            size="large"
            value={pattern.errorMsg || config?.pattern?.errorMsg}
            onChange={(e) => {
              setPattern((prevPatt) => {
                return {
                  ...prevPatt,
                  errorMsg: e.target.value
                };
              });
            }}
          />
        )}
      </Space>
    );
  };

  return (
    <form onSubmit={handleConfirm} className="validations-form">
      <Space direction="vertical" className="validations">
        {renderRequired()}
        {renderPattern()}
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
  type: string
};

AddFieldValidations.defaultProps = {
  isEditing: false,
  config: {},
  type: ''
};
export default AddFieldValidations;
