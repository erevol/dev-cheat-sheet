import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import topicsMock from '../mocks/__topics-mock.json';
import senioritiesMock from '../mocks/__seniorities-mock.json';
import ErrorMessage from './ErrorMessage';

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(where: { id: $id }) {
      id
      title
      topic
      seniority
      source
      answer
    }
  }
`;

const UPDATE_QUESTION_MUTATION = gql`
  mutation UPDATE_QUESTION_MUTATION(
    $id: ID!
    $title: String!
    $topic: String!
    $seniority: String!
    $source: String!
    $answer: String!
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
      topic
      seniority
      source
      answer
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class UpdateQuestion extends Component {
  state = {};

  handleChange = (e, data) => {
    const { id, value } = data;
    console.log(id);
    console.log(value);
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
            Update Question
          </StyledHeader>
            <Mutation
              mutation={UPDATE_QUESTION_MUTATION}
              variables={this.state}
            >
              {(updateQuestion, { loading, error, called, data }) => (
                <Form size="large"
                  onSubmit={async e => {
                    e.preventDefault();
                    const response = await updateQuestion();
                    console.log(response.data.updateQuestion.id);
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
                      onChange={this.handleChangeInput}
                    />
                  </Form.Field>
                  <Form.Select
                    id="topic"
                    fluid
                    label="Topic"
                    options={topicsMock}
                    placeholder="Topic"
                    onChange={this.handleChange}
                  />
                  <Form.Select
                    id="seniority"
                    fluid
                    label="Seniority"
                    options={senioritiesMock}
                    placeholder="Seniority"
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                    <label>Source</label>
                    <input
                      id="source"
                      placeholder="Source"
                      type="text"
                      name="source"
                      onChange={this.handleChangeInput}
                    />
                  </Form.Field>
                  <Form.TextArea
                    id="answer"
                    label="Answer"
                    placeholder="Write down the answer here..."
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
                    Save changes
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


export default UpdateQuestion;
export { UPDATE_QUESTION_MUTATION };