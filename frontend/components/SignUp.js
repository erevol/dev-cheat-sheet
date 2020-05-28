import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <StyledHeader as="h1" textAlign="center">
            <Image src="static/favicon.png" /> Sign-up! is easy and fast
          </StyledHeader>
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={this.state}
          >
            {(signup, { error, loading, called, data }) => (
              <Form size="large"
                error={error}
                loading={loading}
                success={called && data}
                onSubmit={async e => {
                  e.preventDefault();
                  await signup();
                  this.setState({
                    name: '',
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
                    id="name"
                    fluid icon="user"
                    iconPosition="left"
                    placeholder="Full Name"
                    name="name"
                    value={this.state.name}
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
                    content={`There was a problem when trying to sign you up. ${error.message}`}
                  />}
                  <Message
                    success
                    header="Success"
                    content="You successfully signed up."
                  />
                  <Button color="red" fluid size="large">
                    Sign Up
                  </Button>
                </Segment>
              </Form>
            )}
          </Mutation>
          <Message>
            Already have an account?&nbsp;
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUp;
