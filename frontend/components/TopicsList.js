import styled from '@emotion/styled';
import Link from 'next/link';
import TopicsQuery from './TopicsQuery';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px;

  @media (min-width: 769px) {
    margin: 50px;
  }
`;

const StyledItem = styled.div`
  margin: 5px;
  background-color: ${props => props.theme.red};
  font-weight: bold;
  padding: 5px 15px;
  transform: skewX(-10deg);
  border-radius: 10px;
  font-size: 1.5em;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.3);
  text-align: center;
  color: ${props => props.theme.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 130px;

  &:nth-child(odd) {
    flex-grow: 2;
  }

  @media (min-width: 769px) {
    flex-grow: unset;
    padding: 5px 25px;
  }

  &:hover {
    background-color: ${props => props.theme.red_darken20};
  }

  a {
    color: ${props => props.theme.white};
  }
`;


class TopicsList extends React.Component {
  render() {
    return (
      <TopicsQuery>
        {({ data, error, loading }) => {
          if(error) return <Message
                              error={error}
                              header="Error"
                              content={`There was an error fetching the topics. ${error.message}`}
                            />
          if(loading) return  <Segment>
                                <Dimmer active inverted>
                                  <Loader size='medium'>Loading</Loader>
                                </Dimmer>
                                <Image src={paragraph} />
                              </Segment>
          if(!data.topics || data.topics.length <= 0) return <Message
                                    error
                                    header="Error"
                                    content="No topics returned."
                                  />
          return (
            <Container>
              <Segment raised placeholder>
                <StyledContainer>
                  { data.topics.map(topic => <StyledItem key={topic.id}>
                    <Link
                      href={{
                        pathname: '/topic',
                        query: { id: topic.id },
                      }}
                    ><a>{topic.name}</a></Link>
                    </StyledItem>
                  )}
                </StyledContainer>
              </Segment>
            </Container>
          )
        }}
      </TopicsQuery>
    );
  }
}

export default TopicsList;
