import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';
import logo from '../static/crown.svg';

const Footer = () => {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About Dev Cheat Sheet' />
            <List link inverted>
              <List.Item as='a'>About Us</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='My Account' />
            <List link inverted>
              <List.Item as='a'>Sign Up</List.Item>
              <List.Item as='a'>Sign In</List.Item>
              <List.Item as='a'>Create a Question</List.Item>
              <List.Item as='a'>Post a Job</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Help & FAQs' />
            <List link inverted>
              <List.Item as='a'>FAQs</List.Item>
              <List.Item as='a'>Contact Us</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Prepare your next tech-interview' />
            <p>
            Access the answers of developers questions. Success your interview!
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src={logo} />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  )
}

export default Footer;
