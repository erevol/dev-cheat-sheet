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
import { ContainerSegment } from './JobsList';

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
          if(error) {
            return (
              <ContainerSegment>
                <Message
                  error
                  header="Error ❗️"
                  content={`There was an error fetching the topics. ${error.message}`}
                />
              </ContainerSegment>
            )
          }
          if(loading) {
            return (
              <ContainerSegment>
                <Dimmer active inverted>
                  <Loader size='medium'>Loading</Loader>
                </Dimmer>
                <Image src={paragraph} />
              </ContainerSegment>
            )
          }
          if(!data.topics || data.topics.length <= 0) {
            return (
              <ContainerSegment>
                <Message
                  header="Nothing to see here 😬"
                  content="There are no questions yet! Stay alert the most common developer's interview questions!"
                />
              </ContainerSegment>
            )
          }
          return (
            <ContainerSegment>
              { data.topics.map(topic => <StyledItem key={topic.id}>
                <Link
                  href={{
                    pathname: '/topic',
                    query: { id: topic.id },
                  }}
                ><a>{topic.name}</a></Link>
                </StyledItem>
              )}
            </ContainerSegment>
          )
        }}
      </TopicsQuery>
    );
  }
}

export default TopicsList;
