import { Mutation } from 'react-apollo';
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
import { StyledFormContainer } from './PostJob';
import paragraph from '../static/paragraph.png';
import CreateQuestionQuery from './CreateQuestionQuery';
import Router from 'next/router';
import { CREATE_QUESTION_QUERY } from './CreateQuestionQuery';

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
      votes: 0
    ) {
      id
      title
      topic { id name }
      seniority { id name }
      source
      answer
      votes
    }
  }
`;

const CREATE_TOPIC_MUTATION = gql`
  mutation CREATE_TOPIC_MUTATION($name: String!){
    createTopic(name: $name) {
      id
      name
    }
  }
`;

const CREATE_SENIORITY_MUTATION = gql`
  mutation CREATE_SENIORITY_MUTATION($name: String!){
    createSeniority(name: $name) {
      id
      name
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class CreateQuestion extends React.Component {
  state = {
    title: '',
    topic: '',
    seniority: '',
    source: '',
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

  handleTopicAddition = (e, createTopic, value) => {
    if (value) {
      this.setState({ newTopic: value }, () => createTopic());
    }
  }

  handleSeniorityAddition = (e, createSeniority, value) => {
    if (value) {
      this.setState({ newSeniority: value }, () => createSeniority());
    }
  }

  render() {
    return (
      <StyledFormContainer>
        <Container position="center">
          <StyledHeader as="h1" textAlign="center">
            Create a Question
          </StyledHeader>
          <CreateQuestionQuery>
            {({ data, loading, error }) => {
              if(error) {
                return (
                  <Message
                    error
                    header="Error ❗️"
                    content={`There was an error fetching the topics or seniorities. ${error.message}`}
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
              if(!data.topics || !data.seniorities) {
                return (
                  <Message
                    error
                    header="Error ❗️"
                    content="There are no topics or seniorities. Contact the administrator."
                  />
                )
              }
              return (
                <Mutation
                  mutation={CREATE_QUESTION_MUTATION}
                  variables={this.state}
                >
                  {(createQuestion, { loading, error, called }) => (
                    <Form size="large"
                      onSubmit={async e => {
                        e.preventDefault();
                        const res = await createQuestion();
                        Router.push({
                          pathname: '/question',
                          query: { id: res.data.createQuestion.id },
                        });
                      }}
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
                          value={this.state.title}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      <Mutation
                        mutation={CREATE_TOPIC_MUTATION}
                        variables={{name: this.state.newTopic}}
                        refetchQueries={[{ query: CREATE_QUESTION_QUERY }]}
                      >
                        {(createTopic) => (
                          <Form.Select
                            id="topic"
                            fluid
                            search
                            label="Topic"
                            options={data.topics}
                            placeholder="Topic"
                            value={this.state.topic}
                            onChange={this.handleChange}
                            allowAdditions
                            onAddItem={(e, { value }) => this.handleTopicAddition(e, createTopic, value)}
                            closeOnEscape
                          />
                        )}
                      </Mutation>
                      <Mutation
                        mutation={CREATE_SENIORITY_MUTATION}
                        variables={{name: this.state.newSeniority}}
                        refetchQueries={[{ query: CREATE_QUESTION_QUERY }]}
                      >
                        {(createSeniority) => (
                        <Form.Select
                          id="seniority"
                          fluid
                          search
                          label="Seniority"
                          options={data.seniorities}
                          placeholder="Seniority"
                          value={this.state.seniority}
                          onChange={this.handleChange}
                          allowAdditions
                          onAddItem={(e, { value }) => this.handleSeniorityAddition(e, createSeniority, value)}
                          closeOnEscape
                        />
                      )}
                      </Mutation>
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
                      {error && <Message
                        error
                        header="Error"
                        content={`There was a problem creating the question. ${error.message}`}
                      />}
                      <Message
                        success
                        header="Success"
                        content="You created a new question."
                      />
                      <Button color="red" fluid size="big">
                        Submit
                      </Button>
                      </Segment>
                    </Form>
                  )}
                </Mutation>
                );
              }}
          </CreateQuestionQuery>
        </Container>
      </StyledFormContainer>
    );
  }
}


export default CreateQuestion;
export { CREATE_QUESTION_MUTATION };
