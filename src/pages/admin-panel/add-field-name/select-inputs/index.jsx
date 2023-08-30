import { useState, useRef } from 'react';
import { array } from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';

const SelectInputs = ({ handleAddItem, items }) => {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    handleAddItem(name);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      size="large"
      style={{ width: 300 }}
      placeholder="Enter Values"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input size="large" placeholder="Please enter item" ref={inputRef} value={name} onChange={onNameChange} />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem} disabled={!name}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

SelectInputs.propTypes = {
  handleAddItem() {},
  items: array
};

SelectInputs.defaultProps = {
  items: []
};

export default SelectInputs;
