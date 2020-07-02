import User from './User';
import styled from '@emotion/styled';
import css from '@emotion/css';
import Question from './Question';
import QuestionsByUserQuery from './QuestionsByUserQuery';
import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
  Button,
  Icon,
  Header,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';

const commonMargin = (props) => css`
  max-width: ${props.theme.maxWidth};
  margin: 0 auto;
`;

const StyledHeading = styled.h1`
  text-transform: uppercase;
  line-height: 3;
  ${commonMargin}
`;

const StyledPrintContainer = styled.div`
  display: none;
  max-width: 674px;
`;

const QuestionsOrderedList = styled.ol`
  padding: 0 0 0 15px;
  list-style: none;
  counter-reset: li;
  ${commonMargin}
`;

const StyledIcon = styled.div`
  transition: all 0.2s ease-out;
  padding-bottom: 30px;

  ${commonMargin}
`;

class QuestionsByUserList extends React.Component {
  render() {
    return (
      <QuestionsByUserQuery id={this.props.id}>
        {({ data, error, loading }) => {
          if(error) return <Message
          error={error}
          header="Error"
          content={`There was an error fetching the questions. ${error.message}`}
          />
          if(loading) return  <Segment>
                                <Dimmer active inverted>
                                  <Loader size='medium'>Loading</Loader>
                                </Dimmer>
                                <Image src={paragraph} />
                              </Segment>
          if(!data.questionsByUser || !data.questionsByUser.questions || data.questionsByUser.questions.length <= 0 ) return <Message
          header="Nothing to see here 😬"
          content="There are no questions yet! In the mean while, check another topic questions and the latest answers from top interview questions. Success you interview!"
          />
          return (
            <>
              <StyledHeading>{data.questionsByUser.name} Questions</StyledHeading>
              <User>
                {({ data }) => {
                  const me = data ? data.me : null;
                  return (
                    me ? <ReactToPrint
                      trigger={() => {
                        return (
                          <StyledIcon>
                            <Button icon labelPosition="left" color="red" size="big">
                              <Icon name="file pdf" />
                              Print
                            </Button>
                          </StyledIcon>
                        )
                      }}
                      content={() => this.componentRef}
                      pageStyle={{}}
                    /> : <Header as="h1" style={{margin: '-15px 0 25px 0'}}>
                          <Header.Subheader>Sign in to export all questions to PDF 😌 ✨</Header.Subheader>
                        </Header>
                  )
                }}
              </User>
              <QuestionsOrderedList >
                { data.questionsByUser.questions.map(question => <Question
                  question={question}
                  key={question.id}
                  pathname={this.props.pathname}
                  />) }
              </QuestionsOrderedList>
              <StyledPrintContainer>
                <ComponentToPrint
                  ref={element => (this.componentRef = element)}
                  questions={data.questionsByUser.questions}
                  topic={data.questionsByUser.questions[0].topic.name}
                />
              </StyledPrintContainer>
            </>
          )
        }}
      </QuestionsByUserQuery>
    );
  }
}

export default QuestionsByUserList;
