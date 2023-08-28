import { useState } from "react"
import { Button, Checkbox } from "antd";

import './index.css'

const AddFieldValidations = ({ onConfirm }) => {
  const [required, setRequired] = useState(false);

  const handleConfirm = () => {
    onConfirm({ required })
  }

  return (
    <form onSubmit={handleConfirm} className="validations-form">
      <div className="validations">
        <Checkbox onChange={e => setRequired(e.target.checked)}>Required</Checkbox>
      </div>
      <Button type="primary" onClick={handleConfirm}>Confirm</Button>
    </form>
  )
}

AddFieldValidations.propTypes = {
  onConfirm() {}
}

export default AddFieldValidations