import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import topicsMock from '../mocks/__topics-mock.json';
import senioritiesMock from '../mocks/__seniorities-mock.json';
import ErrorMessage from './ErrorMessage';

const CREATE_QUESTION_MUTATION = gql`
  mutation CREATE_QUESTION_MUTATION(
    $title: String!
    $topic: String!
    $seniority: String!
    $source: String!
    $answer: String!
  ) {
    createQuestion(
      title: $title
      topic: $topic
      seniority: $seniority
      source: $source
      answer: $answer
    ) {
      id
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class CreateQuestion extends Component {
  state = {
    title: '',
    topic: '',
    seniority: '',
    source: 'https://test.com',
    answer: '',
  };

  handleChange = (e, data) => {
    const { id, value } = data;
    this.setState({ [id]: value });
  };

  handleChangeInput = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <StyledHeader as="h1" textAlign="center">
            Create a Question
          </StyledHeader>
          <Mutation
            mutation={CREATE_QUESTION_MUTATION}
            variables={this.state}
          >
            {(createQuestion, { loading, error, called, data }) => (
              <Form size="large"
                onSubmit={async e => {
                  e.preventDefault();
                  const response = await createQuestion();
                  console.log(response.data.createQuestion.id);
                }}
                error={error}
                loading={loading}
                success={called && data}
              >
                <Segment stacked>
                <Form.Field>
                  <label>Title</label>
                  <input
                    id="title"
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChangeInput}
                  />
                </Form.Field>
                <Form.Select
                  id="topic"
                  fluid
                  label="Topic"
                  options={topicsMock}
                  placeholder="Topic"
                  value={this.state.topic}
                  onChange={this.handleChange}
                />
                <Form.Select
                  id="seniority"
                  fluid
                  label="Seniority"
                  options={senioritiesMock}
                  placeholder="Seniority"
                  value={this.state.seniority}
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <label>Source</label>
                  <input
                    id="source"
                    placeholder="Source"
                    type="text"
                    name="source"
                    value={this.state.source}
                    onChange={this.handleChangeInput}
                  />
                </Form.Field>
                <Form.TextArea
                  id="answer"
                  label="Answer"
                  placeholder="Write down the answer here..."
                  value={this.state.answer}
                  onChange={this.handleChange}
                />
                <Message
                  error
                  header='Error'
                  content='There was a problem creating the question.'
                />
                <ErrorMessage error={error} />
                <Message
                  success
                  header='Success'
                  content="You created a new question."
                />
                <Button color="red" fluid size="large">
                  Submit
                </Button>
                </Segment>
              </Form>
            )}
          </Mutation>
        </Grid.Column>
      </Grid>
    );
  }
}


export default CreateQuestion;
export { CREATE_QUESTION_MUTATION };