import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import {
  Button,
  Form,
  Container,
  Header,
  Segment,
  Message,
  Dimmer,
  Loader,
  Image,
} from 'semantic-ui-react';
import paragraph from '../static/paragraph.png';
import { StyledFormContainer } from './PostJob';
import UpdateQuestionQuery from './UpdateQuestionQuery';

const UPDATE_QUESTION_MUTATION = gql`
  mutation UPDATE_QUESTION_MUTATION(
    $id: ID!
    $title: String
    $topic: String
    $seniority: String
    $source: String
    $answer: String
  ) {
    updateQuestion(
      id: $id
      title: $title
      topic: $topic
      seniority: $seniority
      source: $source
      answer: $answer
    ) {
      id
      title
      topic { id name }
      seniority { id name }
      source
      answer
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class UpdateQuestion extends React.Component {
  state = {}

  handleChange = (e, data) => {
    const { id, value } = data;
    this.setState({ [id]: value });
  };

  handleChangeInput = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  onSubmitForm = async (e, updateQuestionMutation) => {
    e.preventDefault();
    const res = await updateQuestionMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <StyledFormContainer>
        <Container position="center">
          <StyledHeader as="h1" textAlign="center">
            Update Question
          </StyledHeader>
          <UpdateQuestionQuery id={this.props.id}>
            {({ data, loading, error }) => {
              if(error) {
                return (
                  <Message
                    error
                    header="Error ❗️"
                    content={`There was an error fetching the question. ${error.message}`}
                  />
                )
              }
              if(loading) {
                return (
                  <>
                    <Dimmer active inverted>
                      <Loader size='medium'>Loading</Loader>
                    </Dimmer>
                    <Image src={paragraph} />
                    <Image src={paragraph} />
                    <Image src={paragraph} />
                  </>
                )
              }
              if(!data.question || !data.topics || !data.seniorities) {
                return (
                  <Message
                    error
                    header="Error ❗️"
                    content={`No Question Found for ID ${this.props.id}`}
                  />
                )
              }
              return (
                <Mutation
                  mutation={UPDATE_QUESTION_MUTATION}
                  variables={this.state}
                >
                  {(updateQuestion, { loading, error, called }) => (
                    <Form size="large"
                      onSubmit={e => this.onSubmitForm(e, updateQuestion)}
                      error={error}
                      loading={loading}
                      success={!error && !loading && called}
                    >
                      <Segment stacked>
                      <Form.Field>
                        <label>Title</label>
                        <input
                          id="title"
                          placeholder="Title"
                          type="text"
                          name="title"
                          defaultValue={data.question.title}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      <Form.Select
                        id="topic"
                        fluid
                        label="Topic"
                        options={data.topics}
                        placeholder="Topic"
                        defaultValue={data.question.topic.name}
                        onChange={this.handleChange}
                      >
                      </Form.Select>
                      <Form.Select
                        id="seniority"
                        fluid
                        label="Seniority"
                        options={data.seniorities}
                        placeholder="Seniority"
                        defaultValue={data.question.seniority.name}
                        onChange={this.handleChange}
                      />
                      <Form.Field>
                        <label>Source</label>
                        <input
                          id="source"
                          placeholder="Source"
                          type="text"
                          name="source"
                          defaultValue={data.question.source}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      <Form.TextArea
                        id="answer"
                        label="Answer"
                        placeholder="Write down the answer here..."
                        defaultValue={data.question.answer}
                        onChange={this.handleChange}
                      />
                      {error && <Message
                        error
                        header="Error"
                        content={`There was a problem updating the question. ${error.message}`}
                      />}
                      <Message
                        success
                        header="Success"
                        content="You updated a new question."
                      />
                      <Button color="red" fluid size="big">
                        Save changes
                      </Button>
                      </Segment>
                    </Form>
                  )}
                </Mutation>
              );
            }}
        </UpdateQuestionQuery>
        </Container>
      </StyledFormContainer>
    );
  }
}


export default UpdateQuestion;
export { UPDATE_QUESTION_MUTATION };