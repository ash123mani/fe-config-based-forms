import { Space, Button } from 'antd';
import { Link } from 'react-router-dom';

const Header = ({ handleAddNode }) => {
  return (
    <nav className="admin-header">
      <Space size="large">
        <Button type="dashed">
          <strong>Platform Panel</strong>
        </Button>
        <Link to="/admin">
          <Button type="lik">Admin</Button>
        </Link>
        <Link to="/">
          <Button type="lik">Home</Button>
        </Link>
      </Space>
      <Button type="primary" onClick={handleAddNode}>
        + Add Node Type
      </Button>
    </nav>
  );
};

Header.propTypes = {
  handleAddNode() {}
};

export default Header;
