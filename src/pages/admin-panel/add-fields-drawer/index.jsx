import { useEffect, useState } from 'react';
import { Drawer } from "antd";
import { bool, shape, string } from 'prop-types';
import { useMutation } from '@apollo/client';

import FieldTypes from "../add-field-types";
import AddFieldName from '../add-field-name';
import { ADD_FIELD } from '../../../gql';

const NodesFieldDrwaer = ({ handleClose, open, selectedNode }) => {
  const [addNodeField, { loading: loadingAddField, error: errorAddField }] = useMutation(ADD_FIELD);

  const [screen, setScreen] = useState('add-field-basic');
  const [form, setForm] = useState({})

  useEffect(() => updateForm({ key: 'nodeId', value: selectedNode._id }), [selectedNode])

  const handleFieldSelect = ({ elementType }) => updateForm({ key: 'elementType', value: elementType || ''});
  
  const updateForm = ({ key, value }) => setForm((prevForm) => ({ ...prevForm, [key]: value }))
  
  const handleChangeFieldTypeClick = () => {
    setScreen('add-field-basic');
    updateForm({ key: 'elementType', value: '' })
  }

  const handleAddField = async (basicInfo) => {
    if (!basicInfo.name || !basicInfo.apiIdentifier) return

    const variables = { ...form, basicInfo };
    console.log('variables', variables)
    updateForm({ key: 'basicInfo', value: basicInfo });
    await addNodeField({ variables });
    if (!errorAddField) {
      setScreen('validations')
    }
  }

  const renderScreen = () => {
    if (screen === 'add-field-basic') {
      if (!form.elementType) return <FieldTypes onFieldSelect={handleFieldSelect} />
      return <AddFieldName onChangeFieldTypeClick={handleChangeFieldTypeClick} onAddField={handleAddField} loading={loadingAddField} />
    }
    if (screen === 'validations') {
      return <h1>Validations</h1>
    }
  }

  const handleDrawerClose = () => {
    handleClose()
    handleFieldSelect({})
  }

  return (
    <Drawer title="Add Field" placement="right" onClose={handleDrawerClose} open={open} size="large">
      {renderScreen()}
  </Drawer>
  )
}

NodesFieldDrwaer.propTypes = {
  handleClose(){},
  open: bool,
  selectedNode: shape({
    name: string,
    apiIdentifier: string,
    _id: string
  })
}

NodesFieldDrwaer.defaultProps = {
  open: false
}

export default NodesFieldDrwaer