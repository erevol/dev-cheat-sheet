import { Query, Mutation } from 'react-apollo';
import User from './User';
import Link from 'next/link';
import gql from 'graphql-tag';
import {
  Button,
  Container,
  Dimmer,
  Divider,
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
import styled from '@emotion/styled';

const UPDATE_LIKES_MUTATION = gql`
  mutation updateLikes($likes: [ID!], $userId: ID!, $questionId: ID!) {
    updateLikes(likes: $likes, userId: $userId, questionId: $questionId) {
      id
    }
  }
`;

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(where: {id: $id}) {
      id
      title
      answer
      seniority { id name }
      topic { id name }
      likes
      votes
      source
    }
  }
`;

const StyledButton = styled.div`
  width: 100px;
  margin-top: 20px;
  a {
    color: ${props => props.theme.white};
  }
`;

class LikeButton extends React.Component {
  state = {
    toggle: this.props.toggle,
    likes: this.props.likes,
  }

  handleClick = (e, update, toggle) => {
    let clonedLikes = [...this.state.likes];

    if (toggle) {
      clonedLikes.push(this.props.user.id);
    } else {
      clonedLikes = clonedLikes.filter(id => id !== this.props.user.id);
    }
    this.setState({ likes: clonedLikes, toggle }, () => update());
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_LIKES_MUTATION}
        variables={{
          likes: this.state.likes,
          userId: this.props.user.id,
          questionId: this.props.questionId
        }}
        refetchQueries={[{
          query: SINGLE_QUESTION_QUERY,
          variables: { id: this.props.questionId }
        }]}
      >
        {(updateLikes, { loading, error }) => (
          <Button style={{ marginLeft: '10px' }} as="div" labelPosition="right" onClick={(e) => this.handleClick(e, updateLikes, !this.state.toggle)}>
            <Button color="red">
              { this.state.toggle ? <Icon name="heart" /> : <Icon name="heart outline" />}
              Like
            </Button>
            <Label as="a" basic color="red" pointing="left">
              { this.state.likes.length || 0 }
            </Label>
          </Button>
        )}
      </Mutation>
    )
  }
}

class SingleQuestion extends React.Component {
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
                              content={`There was an error fetching the question. ${error.message}`}
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
          const { id, title, seniority, topic, answer, votes, likes } = data.question;

          return <StyledContainer>
            <Container textAlign="justified">
              <Header as="h2">{title}
              <User>
                {({ data }) => {
                  const me = data ? data.me : null;
                  return (
                    me ? <LikeButton questionId={this.props.id} toggle={likes.includes(me.id)} likes={likes} votes={votes} user={me}/> : <Header as="h1">
                    <Header.Subheader>Sign in to like this question 😌 ✨</Header.Subheader>
                  </Header>
                  )
                }}
              </User>
              </Header>
              <Divider />
              <p>{answer}</p>
              <Divider />
              <Header as="h3">Learn more about <Link
                  href={{
                    pathname: '/topic',
                    query: { id: topic.id },
                  }}
                >
                  <a>{topic.name}</a>
                </Link></Header>
              <Header as="h3">See more <Link
                  href={{
                    pathname: '/',
                  }}
                >
                  <a>{seniority.name}</a>
                </Link> questions</Header>

              <User>
                {({ data }) => {
                  const me = data ? data.me : null;
                  return (
                    me && <StyledButton>
                    <Button color="red" size="large" fluid>
                      <Link
                        href={{
                          pathname: '/update-question',
                          query: { id },
                        }}
                      >
                        <a>Update</a>
                      </Link>
                    </Button>
                  </StyledButton>
                  )
                }}
              </User>
            </Container>
          </StyledContainer>
        }}
      </Query>
    );
  }
}

export default SingleQuestion;
export {SINGLE_QUESTION_QUERY};
