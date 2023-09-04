import { Space, Button } from 'antd';
import { Link } from 'react-router-dom';

const Header = ({ onConfigClick }) => {
  return (
    <Space size="large">
      <Button type="dashed">
        <strong>Admin Panel</strong>
      </Button>

      <Link to="/platform">
        <Button type="lik">Platform</Button>
      </Link>

      <Link to="/">
        <Button type="lik">Home</Button>
      </Link>

      <Button type="lik" onClick={onConfigClick}>
        Selected Node Config
      </Button>
    </Space>
  );
};

Header.propTypes = {
  onConfigClick() {}
};

export default Header;
