import React, { Component } from 'react';
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
import { StyledContainer } from './Questions';

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(where: {id: $id}) {
      id
      title
      answer
      seniority
      topic
      votes
    }
  }
`;

class SingleQuestion extends Component {
  render() {
    return (
      <Query
        query={SINGLE_QUESTION_QUERY}
        variables={{ id: this.props.id }}
      >
        {({error, loading, data }) => {
          if(error) return <Message
                              error={error}
                              header="Error"
                              content="There was an error fetching the question."
                            />
          if(loading) return <Segment>
                            <Dimmer active inverted>
                              <Loader size='medium'>Loading</Loader>
                            </Dimmer>
                            <Image src={paragraph} />
                          </Segment>
          if(!data.question) return <Message
                              error
                              header="Error"
                              content={''.concat('No question found for ID: ', this.props.id, '.')}
                            />
          const { id, title, seniority, topic, answer, votes } = data.question;
          return <StyledContainer>
            <Container textAlign="justified">
              <Header as="h2">{title}
                <Button style={{ marginLeft: '10px' }} as="div" labelPosition="right" >
                  <Button color="red">
                    <Icon name="heart" />
                    Like
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    { votes || 0 }
                  </Label>
                </Button>
              </Header>
              <Divider />
              <p>{answer}</p>
              <Grid.Row>
                <Button size='mini'>{seniority}</Button>
                <Button size='mini'>{topic}</Button>
              </Grid.Row>
              <Divider />
              <Header as="h3">Learn more about <Link
                  href={{
                    pathname: '/questions',
                  }}
                >
                  <a>{topic}</a>
                </Link></Header>
              <Header as="h3">See more <Link
                  href={{
                    pathname: '/questions',
                  }}
                >
                  <a>{seniority}</a>
                </Link> questions</Header>
            </Container>

          </StyledContainer>
        }}
      </Query>
    );
  }
}

export default SingleQuestion;
export {SINGLE_QUESTION_QUERY};
