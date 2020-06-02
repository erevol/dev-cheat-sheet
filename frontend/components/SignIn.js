import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class SignIn extends React.Component {
  state = {
    password: '',
    email: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <StyledHeader as="h1" textAlign="center">
            <Image src="static/favicon.png" /> Log-in to your account
          </StyledHeader>
          <Mutation
            mutation={SIGNIN_MUTATION}
            variables={this.state}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(signin, { error, loading, called }) => (
              <Form size="large"
                error={error}
                loading={loading}
                success={!error && !loading && called}
                onSubmit={async e => {
                  e.preventDefault();
                  await signin();
                  this.setState({
                    email: '',
                    password: '',
                  });
                }}
              >
                <Segment stacked>
                  <Form.Input
                    id="email"
                    fluid icon="at"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
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
                  {error && <Message
                    error
                    header="Error"
                    content={`There was a problem when trying to sign you in. ${error.message}`}
                  />}
                  <Message
                    success
                    header="Success"
                    content="You successfully signed in."
                  />
                  <Button color="red" fluid size="large">
                    Sign In
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
            &nbsp;|&nbsp;
            <Link href="/request-reset">
              <a>Forgot password?</a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignIn;
