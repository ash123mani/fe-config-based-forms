import { array } from 'prop-types';
import { Input, InputNumber, Button, Space, Form, Select } from 'antd';

const Elements = ({ fields }) => {
  if (!fields.length) return null;

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderType = (field) => {
    const { elementType, basicInfo, validations } = field;
    const { pattern = {} } = validations;
    const reqRule = {
      required: validations.required,
      message: validations.errorMsg
    };

    const patternRule = {
      type: pattern?.pattern || '',
      message: pattern?.errorMsg
    };

    let rules = [reqRule];

    if (pattern.value) {
      rules.push(patternRule);
    }

    if (elementType === 'Text') {
      return (
        <Form.Item label={basicInfo.name} name={basicInfo.apiIdentifier} rules={rules}>
          <Input placeholder={basicInfo.name} size="large" />
        </Form.Item>
      );
    }

    if (elementType === 'Integer') {
      return (
        <Form.Item label={basicInfo.name} name={basicInfo.apiIdentifier} rules={rules}>
          <InputNumber placeholder={basicInfo.name} size="large" />
        </Form.Item>
      );
    }

    if (elementType === 'Select') {
      const fields = basicInfo?.dataFields;
      const options = fields.map((f) => {
        return {
          value: f,
          label: f
        };
      });
      return (
        <Form.Item label={basicInfo.name} name={basicInfo.apiIdentifier} rules={[reqRule]}>
          <Select style={{ width: 120 }} options={options} />
        </Form.Item>
      );
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {fields.map((field) => {
        return (
          <div key={field._id} style={{ margin: '12px 0' }}>
            {renderType(field)}
          </div>
        );
      })}
      <Space wrap align="end">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button>Cancel</Button>
      </Space>
    </Form>
  );
};

Elements.propTypes = {
  fields: array
};

Elements.defaultProps = {
  fields: []
};

export default Elements;
