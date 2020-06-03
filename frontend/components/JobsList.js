import styled from '@emotion/styled';
import Link from 'next/link';
import JobsQuery from './JobsQuery';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
  Container,
  Card,
  Button,
  Grid,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';
import curriculum from '../static/curriculum.svg';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.position == 'center' ? 'center' : 'left'};
  margin: 10px;

  @media (min-width: 769px) {
    margin: 50px;
  }

  > div.ui.message {
    font-size: 1.2em;
  }
`;

const StyledButtonGroup = styled.div`
  button {
    display: inline-block !important;
    margin: 0 .25em 0 0 !important;
  }
`;

const StyledButton = styled.div`
  a {
    color: ${props => props.theme.white} !important;
  }

  > button.ui.red.button {
    background-color: ${props => props.theme.red};

    &:hover {
      background-color: ${props => props.theme.red_darken20};
      transition: background 0.2s ease-out;
    }
  }
`;

const StyledCardDescription = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  div.read-more-button {
    color: ${props => props.theme.red_darken20};
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }
  span.displayed-text {
    cursor: pointer;
  }
  margin-bottom: 5px;
`;

const ContainerSegment = ({children, position = 'center'}) => {
  return (
    <Container>
      <Segment raised placeholder>
        <StyledContainer position={position}>
          {children}
        </StyledContainer>
      </Segment>
    </Container>
  )
}


class JobsList extends React.Component {
  render() {
    return (
      <JobsQuery>
        {({ data, error, loading }) => {
          if(error) {
            return (
              <ContainerSegment>
                <Message
                  error
                  header="Error ❗️"
                  content={`There was an error fetching the jobs. ${error.message}`}
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
          if(!data.jobs || data.jobs.length <= 0) {
            return (
              <ContainerSegment>
                <Message
                  header="Nothing to see here 😬"
                  content="There are no jobs yet! In the mean while, keep checking on the latest answers from top interview questions. Success you interview!"
                />
              </ContainerSegment>
            )
          }
          return (
            <ContainerSegment position="left">
              <Card.Group>
                <Grid columns={3} stackable stretched>
                  { data.jobs.map(job =>
                    <Grid.Column>
                      <Card key={job.id}>
                        <Card.Content>
                          <Image
                            floated='right'
                            size='mini'
                            src={curriculum}
                          />
                          <Card.Header>{job.jobTitle}</Card.Header>
                          <Card.Meta>{job.company}</Card.Meta>
                          <StyledCardDescription>
                            <Card.Description>
                              {job.description}
                            </Card.Description>
                          </StyledCardDescription>
                          <StyledButtonGroup floated='left'>
                            { job.topics.map( topic => <Button key={topic.name} size='mini'>{topic.name}</Button>)}
                          </StyledButtonGroup>
                        </Card.Content>
                        <Card.Content extra>
                        <StyledButton>
                          <Button color='red' floated='right'>
                           <Link
                              href={{
                                pathname: '/job',
                                query: { id: job.id },
                              }}
                            ><a>Apply</a></Link>
                          </Button>
                        </StyledButton>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  )
                }
              </Grid>
              </Card.Group>
            </ContainerSegment>
          )
        }}
      </JobsQuery>
    );
  }
}

export default JobsList;
export {
  ContainerSegment,
}
