import { Link } from 'react-router-dom';
import { Space, Button } from 'antd';

const Home = () => {
  return (
    <div className="home">
      <Space>
        <Link to="/admin">
          <Button type="link">Admin</Button>
        </Link>
        <Link to="/platform">
          <Button type="lik">Platfrom</Button>
        </Link>
      </Space>
    </div>
  );
};

export default Home;
