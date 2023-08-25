import { Drawer } from "antd";
import { bool } from 'prop-types';

const NodesFieldDrwaer = ({ handleClose, open }) => {
  return (
    <Drawer title="Basic Drawer" placement="right" onClose={handleClose} open={open}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
  )
}

NodesFieldDrwaer.propTypes = {
  handleClose(){},
  open: bool
}

NodesFieldDrwaer.defaultProps = {
  open: false
}

export default NodesFieldDrwaer