import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class SignIn extends React.Component {
  render() {
    return (
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <StyledHeader as='h1' textAlign='center'>
            <Image src='static/favicon.png' /> Log-in to your account
          </StyledHeader>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='red' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
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

export default SignIn;
