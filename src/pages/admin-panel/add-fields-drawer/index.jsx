import { useState } from 'react';
import { Drawer } from "antd";
import { bool } from 'prop-types';

import FieldTypes from "../add-field-types";
import AddFieldName from '../add-field-name';

const NodesFieldDrwaer = ({ handleClose, open }) => {
  const [screen, setScreen] = useState('add-field-basic');
  const [form, setForm] = useState({})

  const handleFieldSelect = (node) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        element: node.element || ''
      }
    })
  }

  const renderScreen = () => {
    if (screen === 'add-field-basic') {
      if (!form.element) return <FieldTypes onFieldSelect={handleFieldSelect} />
      return <AddFieldName />
    } 
  }

  const handleDrawerClose = () => {
    handleClose()
    handleFieldSelect({})
  }

  return (
    <Drawer title="Basic Drawer" placement="right" onClose={handleDrawerClose} open={open} size="large">
      {renderScreen()}
  </Drawer>
  )
}

NodesFieldDrwaer.propTypes = {
  handleClose(){},
  open: bool,
}

NodesFieldDrwaer.defaultProps = {
  open: false
}

export default NodesFieldDrwaer