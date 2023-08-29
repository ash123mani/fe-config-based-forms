import { useState } from 'react';
import { Button, Checkbox, Input, Space } from 'antd';
import { bool, object } from 'prop-types';

import './index.css';

const AddFieldValidations = ({ onConfirm, config }) => {
  const [required, setRequired] = useState({
    value: config.required || false,
    errorMsg: ''
  });

  const handleConfirm = () => {
    onConfirm({ required: required.value, errorMsg: required.errorMsg });
  };

  const renderRequired = () => {
    return (
      <Space direction="vertical" style={{ display: 'flex' }}>
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
            value={required.errorMsg || config.errorMsg}
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

  return (
    <form onSubmit={handleConfirm} className="validations-form">
      <div className="validations">{renderRequired()}</div>
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </form>
  );
};

AddFieldValidations.propTypes = {
  onConfirm() {},
  isEditing: bool,
  config: object
};

AddFieldValidations.defaultProps = {
  isEditing: false,
  config: {}
};
export default AddFieldValidations;
