import { array } from 'prop-types';
import { Input, InputNumber, Button, Space } from 'antd'

const Elements = ({ fields }) => {
  console.log('fields', fields)


  if (!fields.length) return null

  const renderType = (field) => {
    const { elementType, basicInfo } = field;

    if (elementType === "Text") {
       return <Input placeholder={basicInfo.name} size="large" />
    }

    if (elementType === "Integer") {
      return <InputNumber placeholder={basicInfo.name} size="large" />
   }
  }
  

  return (
    <form>
      {fields.map((field) => {
        return <div key={field._id} style={{ margin: "12px 0" }}>{renderType(field)}</div>
      })}
      <Space wrap align='end'>
      <Button type='primary'>Submit</Button>
      <Button>Cancel</Button>
      </Space>

    </form>
  )
}

Elements.propTypes = {
  fields: array
}

Elements.defaultProps = {
  fields: []
}

export default Elements