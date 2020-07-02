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
import Link from 'next/link';

const Footer = () => {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About Dev Cheat Sheet' />
            <List link inverted>
              <Link href="/about-us"><List.Item as='a'>About Us</List.Item></Link>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='My Account' />
            <List link inverted>
              <Link href="/signup"><List.Item as='a'>Sign Up</List.Item></Link>
              <Link href="/signin"><List.Item as='a'>Sign In</List.Item></Link>
              <Link href="/create-question"><List.Item as='a'>Create a Question</List.Item></Link>
              <Link href="/post-job"><List.Item as='a'>Post a Job</List.Item></Link>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Help & FAQs' />
            <List link inverted>
            <Link href="/about-us"><List.Item as='a'>FAQs</List.Item></Link>
            <Link href="/about-us"><List.Item as='a'>Contact Us</List.Item></Link>
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
          <Link href="/about-us"><List.Item as='a'>Site Map</List.Item></Link>
          <Link href="/about-us"><List.Item as='a'>Contact Us</List.Item></Link>
          <Link href="/about-us"><List.Item as='a'>Terms and Conditions</List.Item></Link>
          <Link href="/about-us"><List.Item as='a'>Privacy Policy</List.Item></Link>
        </List>
      </Container>
    </Segment>
  )
}

export default Footer;
