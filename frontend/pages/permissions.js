import PrivateRoute from '../components/PrivateRoute';
import Permissions from '../components/Permissions';

const PermissionsPage = props => (
  <PrivateRoute>
    <Permissions />
  </PrivateRoute>
);

export default PermissionsPage;
