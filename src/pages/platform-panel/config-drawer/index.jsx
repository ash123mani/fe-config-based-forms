import omit from 'lodash/omit';
import { bool, object } from 'prop-types';
import { Drawer } from 'antd';

const ConfigDrawer = ({ open, onDrawerClose, nodes }) => {
  const afterOmmited = (nodes?.nodeFields || []).map((field) => {
    return omit(field, [
      '__typename',
      '_id',
      'basicInfo.__typename',
      'validations.__typename',
      'validations.pattern.__typename'
    ]);
  });

  return (
    <Drawer title="Selected Node Config" placement="right" onClose={onDrawerClose} open={open} size="large">
      <pre style={{ backgroundColor: '#1f4662', color: 'white', padding: '24px 20px' }}>
        {afterOmmited.length ? JSON.stringify(afterOmmited, null, 2) : 'No config found'}
      </pre>
    </Drawer>
  );
};

ConfigDrawer.propTypes = {
  open: bool,
  onDrawerClose() {},
  nodes: object
};

ConfigDrawer.defaultProps = {
  open: false
};

export default ConfigDrawer;
