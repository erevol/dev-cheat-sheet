import styled from '@emotion/styled';
import QuestionsQuery from './QuestionsQuery';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Header,
  Segment,
  Container,
  Grid,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';
import crown from '../static/crown.svg';

const StyledHeader = styled.div`
  padding: 26px;

  > img {
    transform: rotate(15deg);
    margin-top: -25px;
    margin-right: 35px;
  }

  > h1.ui.header {
    font-size: 3rem;
    transform: skew(-10deg);

    &:before {
      height: 0;
    }
  }
  > h2.ui.header {
    font-size: 2rem;
    transform: skew(-10deg);
  }
`;

const StyledSegment = styled.div`
  box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.3);
  span {
    font-size: 3em;
    display: block;
    line-height: 1;
  }

  > .ui.inverted.red.segment {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 425px;
    background-color: ${props => props.theme.red} !important;
  }
`;


class Hero extends React.Component {
  render() {
    return (
      <QuestionsQuery>
        {({ data, error, loading }) => {
          if(error) return <Message
                              error={error}
                              header="Error"
                              content={`There was an error fetching the question. ${error.message}`}
                            />
          if(loading) return  <Segment>
                                <Dimmer active inverted>
                                  <Loader size='medium'>Loading</Loader>
                                </Dimmer>
                                <Image src={paragraph} />
                              </Segment>
          if(!data.questions || data.questions.length <= 0) return <Message
                                    error
                                    header="Error"
                                    content="No questions returned."
                                  />
          return (
            <Container>
              <Segment raised placeholder>
                <Grid columns={2} stackable textAlign="center">
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column>
                      <StyledHeader>
                        <Header as="h1">
                          Access the answers of developers questions.
                        </Header>
                        <Header as="h2">
                          Success your interview!
                        </Header>
                      </StyledHeader>
                    </Grid.Column>
                    <Grid.Column>
                      <StyledSegment>
                        <Segment inverted color="red">
                          <StyledHeader>
                            <Image
                              centered
                              size='small'
                              src={crown}
                            />
                            <Header as="h1" inverted>
                              <span>{data.questions.length}</span>
                              Questions & Answers
                            </Header>
                          </StyledHeader>
                        </Segment>
                      </StyledSegment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Container>
          )
        }}
      </QuestionsQuery>
    );
  }
}

export default Hero;
