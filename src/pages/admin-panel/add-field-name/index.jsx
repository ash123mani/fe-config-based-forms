import { Input, Button, Space } from "antd";

import './index.css';

const AddFieldName = () => {
  return (
      <form className="add-field-name" onSubmit={() => { }}>
        <div>
        <h2>Add Field</h2>
        <Input placeholder="Name" size='large' onChange={() => { }} />
        <br />
        <br />
        <Input
          placeholder="Api Identifier"
          size='large'
          onChange={() => { }}
          value={name}
        />
        </div>
        <Space align="end">
        <Button >Change Field Type</Button>
        <Button type="primary">Add and Configure</Button>
      </Space>
      </form>

  )
}

AddFieldName.propTypes = {
  onFieldSelect() { }
}

export default AddFieldName;