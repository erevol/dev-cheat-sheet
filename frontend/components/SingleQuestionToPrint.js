import {
  Container,
  Divider,
  Header,
} from 'semantic-ui-react';

class SingleQuestionToPrint extends React.Component {
  render() {
    const {
      title,
      answer,
      seniority: { name: seniorityName },
      topic: { name: topicName },
      source
    } = this.props.question;

    return (
      <Container textAlign="justified">
        <Header as="h3">
          {this.props.itemNumber}. {title}
          <Header.Subheader>{seniorityName} | {topicName} | {source}</Header.Subheader>
        </Header>
        <Header as="h4">
          {answer}
        </Header>
        <Divider />
      </Container>
    );
  }
}

export default SingleQuestionToPrint;
