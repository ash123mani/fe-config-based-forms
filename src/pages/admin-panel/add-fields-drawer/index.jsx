import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { bool, shape, string, object } from 'prop-types';
import { useMutation } from '@apollo/client';

import FieldTypes from '../add-field-types';
import AddFieldName from '../add-field-name';
import AddFieldValidations from '../add-field-validations';
import { ADD_FIELD, UPDATE_FIELD } from '../../../gql';
import { screens } from './screens';

const NodesFieldDrwaer = ({ handleClose, open, selectedNode, isEditing, editNodeConfig }) => {
  const [addNodeField, { loading: loadingAddField }] = useMutation(ADD_FIELD);
  const [updateNodeField] = useMutation(UPDATE_FIELD);
  const [fieldId, setFieldId] = useState(null);

  const [screen, setScreen] = useState(screens.INFO);
  const [form, setForm] = useState({});

  useEffect(() => updateForm({ key: 'nodeId', value: selectedNode._id }), [selectedNode]);

  useEffect(() => {
    setScreen(isEditing ? screens.INFO : screens.TYPES);
    setForm(isEditing ? editNodeConfig : {});
  }, [isEditing]);

  const handleFieldSelect = ({ elementType }) => {
    updateForm({ key: 'elementType', value: elementType || '' });
    setScreen(screens.INFO);
  };

  const updateForm = ({ key, value }) => setForm((prevForm) => ({ ...prevForm, [key]: value }));

  const handleChangeFieldTypeClick = () => {
    setScreen(screens.TYPES);
    updateForm({ key: 'elementType', value: '' });
  };

  const handleAddField = async (basicInfo) => {
    if (!basicInfo.name || !basicInfo.apiIdentifier) return;

    updateForm({ key: 'basicInfo', value: basicInfo });

    const variables = { ...form, basicInfo };
    const {
      data: { addNodeField: newField }
    } = await addNodeField({ variables });

    if (newField) {
      setScreen(screens.VALIDATIONS);
      setFieldId(newField._id);
    }
  };

  const handleDrawerClose = () => {
    handleClose();
    handleFieldSelect({});
  };

  const updateNode = async (variables) => {
    const vars = { _id: fieldId, ...variables };
    await updateNodeField({ variables: vars });
  };

  const handleValidationsSubmit = async (validations) => {
    updateForm({ key: 'validations', value: validations });
    await updateNode({ validations });
    handleClose();
  };

  const renderScreen = () => {
    if (screen === screens.INFO) {
      return (
        <AddFieldName
          onChangeFieldTypeClick={handleChangeFieldTypeClick}
          onAddField={handleAddField}
          loading={loadingAddField}
          isEditing={isEditing}
          config={editNodeConfig?.basicInfo}
          onEditValidations={() => setScreen(screens.VALIDATIONS)}
        />
      );
    }

    if (screen === screens.TYPES) {
      return <FieldTypes onFieldSelect={handleFieldSelect} config={editNodeConfig?.basicInfo} />;
    }

    if (screen === screens.VALIDATIONS) {
      return <AddFieldValidations onConfirm={handleValidationsSubmit} config={editNodeConfig?.validations} />;
    }
  };

  const getTitle = () => {
    if (screen === screens.INFO) {
      if (!form.elementType) return `Add Element Type for ${selectedNode.name}`;

      return `Add Name for ${selectedNode.name}`;
    }

    if (screen === screens.VALIDATIONS) {
      return `Add Validations for ${selectedNode.name}`;
    }
  };

  return (
    <Drawer title={getTitle()} placement="right" onClose={handleDrawerClose} open={open} size="large">
      {renderScreen()}
    </Drawer>
  );
};

NodesFieldDrwaer.propTypes = {
  handleClose() {},
  open: bool,
  selectedNode: shape({
    name: string,
    apiIdentifier: string,
    _id: string
  }),
  isEditing: bool,
  editNodeConfig: object
};

NodesFieldDrwaer.defaultProps = {
  open: false,
  isEditing: false
};

export default NodesFieldDrwaer;
