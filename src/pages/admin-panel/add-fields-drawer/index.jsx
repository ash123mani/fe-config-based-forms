import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { bool, shape, string, object } from 'prop-types';
import { useMutation } from '@apollo/client';
import omit from 'lodash/omit';

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

  const updateForm = ({ key, value }) => setForm((prevForm) => ({ ...prevForm, [key]: value }));

  useEffect(() => updateForm({ key: 'nodeId', value: selectedNode._id }), [selectedNode]);

  useEffect(() => setFieldId(editNodeConfig._id), [editNodeConfig]);

  useEffect(() => {
    setScreen(isEditing ? screens.INFO : screens.TYPES);
    setForm(isEditing ? omit(editNodeConfig, ['__typename', '_id']) : {});
  }, [isEditing, editNodeConfig]);

  const handleFieldSelect = ({ elementType }) => {
    updateForm({ key: 'elementType', value: elementType || '' });
    setScreen(screens.INFO);
  };

  const handleChangeFieldTypeClick = () => {
    setScreen(screens.TYPES);
    updateForm({ key: 'elementType', value: '' });
  };

  const handleAddField = async (basicInfo) => {
    console.log('basicInfo', basicInfo);
    if (!basicInfo.name || !basicInfo.apiIdentifier) return;

    updateForm({ key: 'basicInfo', value: basicInfo });

    const variables = { ...form, basicInfo, nodeId: selectedNode._id };

    if (!isEditing) {
      const {
        data: { addNodeField: newField }
      } = await addNodeField({ variables });

      if (newField) {
        setScreen(screens.VALIDATIONS);
        setFieldId(newField._id);
      }
    } else {
      const variables = { ...form, basicInfo };
      await updateNode(omit(variables, 'validations'));
      setScreen(screens.VALIDATIONS);
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
    updateForm({ key: 'validations', value: validations.required });
    updateForm({ key: 'validations', errorMsg: validations.errorMsg });
    updateForm({ key: 'validations', pattern: validations.pattern });
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
          elementType={form?.elementType}
        />
      );
    }

    if (screen === screens.TYPES) {
      return <FieldTypes onFieldSelect={handleFieldSelect} config={editNodeConfig?.basicInfo} />;
    }

    if (screen === screens.VALIDATIONS) {
      return (
        <AddFieldValidations
          onConfirm={handleValidationsSubmit}
          config={editNodeConfig?.validations}
          elementType={form?.elementType}
        />
      );
    }
  };

  const getTitle = () => {
    const name = editNodeConfig?.basicInfo?.name;
    if (screen === screens.INFO) {
      return `Add Name for ${selectedNode.name} ${name ? `[${name}]` : ''}`;
    }

    if (screen === screens.TYPES) {
      return `Add Element Type for ${selectedNode.name} ${name ? `[${name}]` : ''}`;
    }

    if (screen === screens.VALIDATIONS) {
      return `Add Validations for ${selectedNode.name} ${name ? `[${name}]` : ''}`;
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
