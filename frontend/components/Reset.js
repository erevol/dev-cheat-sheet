import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class Reset extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <StyledHeader as="h1" textAlign="center">
            <Image src="static/favicon.png" /> Reset Your Password
          </StyledHeader>
          <Mutation
            mutation={RESET_MUTATION}
            variables={{
              resetToken: this.props.resetToken,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword,
            }}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(reset, { error, loading, called, data }) => (
              <Form size="large"
                error={error}
                loading={loading}
                success={!error && !loading && called}
                onSubmit={async e => {
                  e.preventDefault();
                  await reset();
                  this.setState({ password: '', confirmPassword: '' });
                }}
              >
                <Segment stacked>
                <Form.Input
                    id="password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                  <Form.Input
                    id="confirmPassword"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    />
                  {error && <Message
                    error
                    header="Error"
                    content={`There was a problem when trying to reset the password. ${error.message}`}
                  />}
                  <Message
                    success
                    header="Success"
                    content="Success! Your password has been reset!"
                  />
                  <Button color="red" fluid size="large">
                    Reset Password
                  </Button>
                </Segment>
              </Form>
            )}
          </Mutation>
          <Message>
            New to us?&nbsp;
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
