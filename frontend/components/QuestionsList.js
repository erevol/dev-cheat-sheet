import styled from '@emotion/styled';
import Question from './Question';
import QuestionsByTopicQuery from './QuestionsByTopicQuery';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';

const StyledHeading = styled.h1`
  text-transform: uppercase;
  line-height: 3;
`;

const QuestionsOrderedList = styled.ol`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 0 0 15px;
  list-style: none;
  counter-reset: li;
`;

class QuestionsList extends React.Component {
  render() {
    return (
      <QuestionsByTopicQuery id={this.props.id}>
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
                                    header="Nothing to see here 😬"
                                    content="There are no questions yet! In the mean while, check another topic questions and the latest answers from top interview questions. Success you interview!"
                                  />
          return (
            <>
              <StyledHeading>{data.questions[0].topic.name} Questions</StyledHeading>
                <QuestionsOrderedList>
                  { data.questions.map(question => <Question
                    question={question}
                    key={question.id}
                  />) }
                </QuestionsOrderedList>
            </>
          )
        }}
      </QuestionsByTopicQuery>
    );
  }
}

export default QuestionsList;
