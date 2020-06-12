import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class RequestReset extends React.Component {
  state = {
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
            <Image src="static/favicon.png" /> Request reset password
          </StyledHeader>
          <Mutation
            mutation={REQUEST_RESET_MUTATION}
            variables={this.state}
          >
            {(requestReset, { error, loading, called, data }) => (
              <Form size="large"
                error={error}
                loading={loading}
                success={!error && !loading && called}
                onSubmit={async e => {
                  e.preventDefault();
                  await requestReset();
                  this.setState({ email: '' });
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
                  {error && <Message
                    error
                    header="Error"
                    content={`There was a problem when trying to generate the reset link. ${error.message}`}
                  />}
                  <Message
                    success
                    header="Success"
                    content="Success! Check your email for a reset link!"
                  />
                  <Button color="red" fluid size="large">
                    Request Reset
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

export default RequestReset;
