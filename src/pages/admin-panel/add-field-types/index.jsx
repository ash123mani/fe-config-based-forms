import { Card, Space } from 'antd';
import { fieldTypes } from './config';

const FieldTypes = ({ onFieldSelect }) => {
  return (
    <Space size={16} direction="horizontal" style={{ display: 'flex' }} wrap>
      {fieldTypes.map((field) => {
        return (
          <Card
            hoverable
            title={field.title}
            size="small"
            key={field.elementType}
            style={{ width: '240px' }}
            onClick={() => onFieldSelect(field)}
          >
            <p>{field.description}</p>
          </Card>
        );
      })}
    </Space>
  );
};

FieldTypes.propTypes = {
  onFieldSelect() {}
};

export default FieldTypes;
