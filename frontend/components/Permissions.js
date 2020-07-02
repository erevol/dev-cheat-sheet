import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Container,
  Checkbox,
  Button,
  Header,
  Segment,
  Message,
  Icon,
  Table,
  Dimmer,
  Image,
  Loader,
} from 'semantic-ui-react';
import styled from '@emotion/styled';
import paragraph from '../static/paragraph.png';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const StyledSegment = styled.div`
  .ui.placeholder.segment {
    background: ${props => props.theme.white};
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error, called }) => (
      <Container>
        {loading && <Segment>
                <Dimmer active inverted>
                  <Loader size='huge'/>
                </Dimmer>
                <Image src={paragraph} />
                <Image src={paragraph} />
              </Segment>}
        {error && <Message
              error={error}
              header="Error"
              content={error.message}
            />}
        {!loading && !error && data.users && <StyledSegment>
          <Segment raised placeholder>
            <Header icon>
              <Icon name='key' />
              Manage Permissions
            </Header>
           <Table size='small' celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={10}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={10}>Email</Table.HeaderCell>
                  {possiblePermissions.map(permission => <Table.HeaderCell width={10} key={permission}>{permission}</Table.HeaderCell>)}
                  <Table.HeaderCell width={10}></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{data.users && data.users.map(user => <UserPermissions user={user} key={user.id} />)}</Table.Body>
            </Table>
          </Segment>
        </StyledSegment>}
      </Container>
    )}
  </Query>
);

class UserPermissions extends React.Component {
  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = (e) => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && <Table.Row>
              <Table.Cell colSpan='9'>
                <Message
                  error={error}
                  header="Error"
                  content={error.message}
                />
              </Table.Cell>
            </Table.Row>}
            <Table.Row>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              {possiblePermissions.map(permission => (
                <Table.Cell key={permission}>
                  <Checkbox slider
                    id={`${user.id}-permission-${permission}`}
                    checked={this.state.permissions.includes(permission)}
                    value={permission}
                    onChange={this.handlePermissionChange}
                  />
                </Table.Cell>
              ))}
              <Table.Cell>
                <Button as='button' color="red" fluid size="tiny" onClick={updatePermissions}>
                  Updat{loading ? 'ing...' : 'e'}
                </Button>
              </Table.Cell>
            </Table.Row>
          </>
        )
        }
      </Mutation>
    );
  }
}

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired,
};

export default Permissions;
