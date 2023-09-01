import { Checkbox, Input, Space, Select } from 'antd';
import { object } from 'prop-types';
import { patterns } from '../config';

const Patterns = ({ onChange, onPatternChange, pattern, onErrorChange, config }) => {
  return (
    <Space direction="vertical" style={{ display: 'flex' }} size="middle">
      <Space size="middle">
        <Checkbox onChange={onChange} checked={pattern.value}>
          Match a specific pattern
        </Checkbox>
        {pattern.value && (
          <Select
            defaultValue={config?.pattern?.pattern || ''}
            style={{ width: 120 }}
            placeholder="Enter a pattern"
            onChange={onPatternChange}
            options={patterns.text}
          />
        )}
      </Space>
      {pattern.value && (
        <Input placeholder="Error Message" size="large" value={pattern.errorMsg} onChange={onErrorChange} />
      )}
    </Space>
  );
};

Patterns.propTypes = {
  onPatternChange() {},
  pattern: object,
  onErrorChange() {},
  config: object,
  onChange() {}
};

export default Patterns;
