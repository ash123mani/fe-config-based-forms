import { Checkbox, Input, Space } from 'antd';
import { object } from 'prop-types';

const Required = ({ onTextChange, onErrorChange, required, config }) => {
  return (
    <Space direction="vertical" style={{ display: 'flex' }} size="middle">
      <Checkbox onChange={onTextChange} checked={required.value}>
        Required
      </Checkbox>
      {required.value && (
        <Input
          placeholder="Error Message"
          size="large"
          value={required.errorMsg || config?.errorMsg}
          onChange={onErrorChange}
        />
      )}
    </Space>
  );
};

Required.propTypes = {
  onTextChange() {},
  onErrorChange() {},
  required: object,
  config: object
};

export default Required;
