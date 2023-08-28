import { useEffect, useState } from 'react';
import { Drawer } from "antd";
import { bool, shape, string } from 'prop-types';
import { useMutation } from '@apollo/client';

import FieldTypes from "../add-field-types";
import AddFieldName from '../add-field-name';
import AddFieldValidations from '../add-field-validations';
import { ADD_FIELD, UPDATE_FIELD } from '../../../gql';

const NodesFieldDrwaer = ({ handleClose, open, selectedNode }) => {
  const [addNodeField, { loading: loadingAddField }] = useMutation(ADD_FIELD);
  const [updateNodeField] = useMutation(UPDATE_FIELD);
  const [fieldId, setFieldId] = useState(null);

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

    updateForm({ key: 'basicInfo', value: basicInfo });

    const variables = { ...form, basicInfo };
    const { data: { addNodeField: newField } } = await addNodeField({ variables });
    console.log('newField', newField)

    if (newField) {
      setScreen('validations')
      setFieldId(newField._id);
    }
  }

  const handleDrawerClose = () => {
    handleClose()
    handleFieldSelect({})
  }

  const updateNode = async (variables) => {
    const vars = { _id: fieldId, ...variables }
    await updateNodeField({ variables: vars })
  }

  const handleValidationsSubmit = async (validations) => {
    updateForm({ key: 'validations', value: validations })
    await updateNode({ validations })
    handleClose()
  }

  const renderScreen = () => {
    if (screen === 'add-field-basic') {
      
      if (!form.elementType) return <FieldTypes onFieldSelect={handleFieldSelect} />

      return <AddFieldName onChangeFieldTypeClick={handleChangeFieldTypeClick} onAddField={handleAddField} loading={loadingAddField} />
    }

    if (screen === 'validations') {
      return <AddFieldValidations onConfirm={handleValidationsSubmit}/>
    }
  }

  const getTitle = () => {
    if (screen === 'add-field-basic') {
      
      if (!form.elementType) return `Add Element Type for ${selectedNode.name}`

      return `Add Name for ${selectedNode.name}`
    }

    if (screen === 'validations') {
      return `Add Validations for ${selectedNode.name}`
    }
  }

  return (
    <Drawer title={getTitle()} placement="right" onClose={handleDrawerClose} open={open} size="large">
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