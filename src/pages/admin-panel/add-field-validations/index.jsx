import { useState } from 'react';
import { Button, Checkbox } from 'antd';
import { bool, object } from 'prop-types';

import './index.css';

const AddFieldValidations = ({ onConfirm, config }) => {
  const [required, setRequired] = useState(false);

  const handleConfirm = () => {
    onConfirm({ required });
  };

  return (
    <form onSubmit={handleConfirm} className="validations-form">
      <div className="validations">
        <Checkbox onChange={(e) => setRequired(e.target.checked)} checked={required || config.required}>
          Required
        </Checkbox>
      </div>
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
