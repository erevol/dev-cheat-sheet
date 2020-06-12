import { Query } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';
import { StyledContainer } from './JobsList';

const JOB_QUERY = gql`
  query JOB_QUERY($id: ID!) {
    job(where: { id: $id }){
      id
      jobTitle
      company
      seniority { id name }
      topics { id name }
      location
      description
      contact
      user { id name email}
    }
  }
`;

const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];

class Job extends React.Component {
  render() {
    return (
      <Query
        query={JOB_QUERY}
        variables={{ id: this.props.id }}
      >
        {({error, loading, data }) => {
          if(error) return <Message
                              error={error}
                              header="Error"
                              content={`There was an error fetching this job. ${error.message}`}
                            />
          if(loading) return <Segment>
                            <Dimmer active inverted>
                              <Loader size='medium'>Loading</Loader>
                            </Dimmer>
                            <Image src={paragraph} />
                          </Segment>
          if(!data.job) return <Message
                              error
                              header="Error"
                              content={''.concat('No job found for ID: ', this.props.id, '.')}
                            />
          const {
            jobTitle,
            company,
            seniority,
            topics,
            location,
            description,
            contact,
            user,
          } = data.job;
          return <StyledContainer>
            <Container textAlign="justified">
              <Header as="h2">
                {jobTitle} <Label color="red" size="medium">{seniority.name}</Label>
                <Header.Subheader>{company}</Header.Subheader>
                <Header.Subheader>{location}</Header.Subheader>
              </Header>
              <Divider />
              <p>{description}</p>
              <Grid.Row>
                {topics.length > 0 && topics.map((topic, index) => <Label key={topic.id} color={colors[index]} size="medium">{topic.name}</Label>)}
                <Header as="h3">
                  Contact:
                  <Header.Subheader>{contact}</Header.Subheader>
                </Header>
                <Header as="h3">
                  Posted by:
                  <Header.Subheader>
                    {user.name}
                    <Label>
                    <Icon name="mail" />
                    <Label.Detail>{user.email}</Label.Detail>
                  </Label>
                  </Header.Subheader>
                </Header>
                <Divider />
              </Grid.Row>
            </Container>
          </StyledContainer>
        }}
      </Query>
    );
  }
}

export default Job;
export {
  JOB_QUERY,
  colors,
};
