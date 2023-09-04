import { array } from 'prop-types';
import { Button, Watermark } from 'antd';
import './index.css';

const NodesConfig = ({ fields, onEdit }) => {
  if (!fields.length) {
    return (
      <Watermark content={['No Field Present']}>
        <div style={{ height: 200 }} />
      </Watermark>
    );
  }

  return (
    <div className="nodes-config">
      {fields.map((f) => {
        return (
          <div className="node" key={f._id}>
            <h4 className="element-type">{f.elementType}</h4>
            <h5 className="name">{f.basicInfo.name}</h5>
            <Button type="link" onClick={() => onEdit(f)}>
              Edit
            </Button>
          </div>
        );
      })}
    </div>
  );
};

NodesConfig.propTypes = {
  fields: array,
  onEdit() {}
};

NodesConfig.defaultProps = {
  fields: []
};

export default NodesConfig;
