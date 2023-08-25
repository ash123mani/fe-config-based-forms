import { Card, Space } from 'antd';
import { fieldTypes } from './config';

const FieldTypes = ({ onFieldSelect }) => {
  return (
    <Space size={16}>
      {fieldTypes.map((field) => {
        return (
          <Card hoverable title={field.title} size="small" key={field.element} style={{ width: '240px' }} onClick={() => onFieldSelect(field)}>
            <p>{field.description}</p>
          </Card>
        )
      })}
    </Space>
  )
}

FieldTypes.propTypes = {
  onFieldSelect() {}
}

export default FieldTypes;