import TopQuestionQuery from './TopQuestionQuery';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Container,
  Header,
  Divider,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';
import { ContainerSegment } from './JobsList';

class TopQuestion extends React.Component {
  render() {
    return (
      <TopQuestionQuery>
        {({ data, error, loading }) => {
          if(error) {
            return (
              <ContainerSegment>
                <Message
                  error
                  header="Error ❗️"
                  content={`There was an error fetching the questions. ${error.message}`}
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
          if(!data.questions || data.questions.length <= 0) {
            return (
              <ContainerSegment>
                <Message
                  header="Nothing to see here 😬"
                  content="There are no questions yet! Stay alert the most common developer's interview questions!"
                />
              </ContainerSegment>
            )
          }

          const { title, answer, topic, seniority, votes } = data.questions[0];
          return (
            <ContainerSegment>
              <Container textAlign="justified">
                <Header as="h2">Most liked question 🙌 😌
                  <Header.Subheader>{topic.name} | {seniority.name} | ❤️ {votes} likes</Header.Subheader>
                </Header>
                <Divider />
                <Header as="h3">{title}</Header>
                <p>{answer}</p>
                <Divider />
              </Container>
            </ContainerSegment>
          )
        }}
      </TopQuestionQuery>
    );
  }
}

export default TopQuestion;
