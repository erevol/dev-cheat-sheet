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
import paragraph from '../static/paragraph.png';
import PostJobQuery from './PostJobQuery';
import { ALL_JOBS_QUERY } from './JobsQuery';
import Router from 'next/router';

const StyledFormContainer = styled.div`
  max-width: 400px;
  display: inline-block;
  width: 100%;

  form div.ui.segment {
    font-size: 1.3rem;
  }
`;

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUTATION(
    $jobTitle: String!
    $company: String!
    $topics: [String]
    $seniority: String!
    $location: String!
    $description: String!
    $contact: String!
  ) {
    createJob(
      jobTitle: $jobTitle
      company: $company
      topics: $topics
      seniority: $seniority
      location: $location
      description: $description
      contact: $contact
    ) {
      id
    }
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.red} !important;
`;

class PostJob extends React.Component {
  state = {
    company: '',
    contact: '',
    description: '',
    jobTitle: '',
    location: '',
    seniority: '',
    topics: [],
  };

  handleChange = (e, data) => {
    const { id, value } = data;
    this.setState({ [id]: value });
  };

  handleChangeInput = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    if (name === 'topics' && val.includes(',')) {
      this.setState({ [name]: val.split(',') });
    } else {
      this.setState({ [name]: val });
    }
  };

  render() {
    return (
      <StyledFormContainer>
        <Container position="center">
          <StyledHeader as="h1" textAlign="center">
            Post a Job
          </StyledHeader>
          <PostJobQuery>
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
              if(!data.topics || !data.seniorities) {
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
                  mutation={CREATE_JOB_MUTATION}
                  variables={this.state}
                  refetchQueries={[{ query: ALL_JOBS_QUERY }]}
                >
                  {(createJob, { loading, error, called }) => (
                    <Form size="mini"
                      onSubmit={async e => {
                        e.preventDefault();
                        const res = await createJob();
                        Router.push({
                          pathname: '/job',
                          query: { id: res.data.createJob.id },
                        });
                      }}
                      error={error}
                      loading={loading}
                      success={!error && !loading && called}
                    >
                      <Segment>
                      <Form.Field>
                        <label>Job Title</label>
                        <input
                          id="jobTitle"
                          placeholder="Job Title"
                          type="text"
                          name="jobTitle"
                          value={this.state.jobTitle}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Company</label>
                        <input
                          id="company"
                          placeholder="Company"
                          type="text"
                          name="company"
                          value={this.state.company}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      <Form.Select
                        id="topics"
                        fluid
                        multiple
                        search
                        selection
                        label="Topics"
                        options={data.topics}
                        placeholder="Topics"
                        value={this.state.topics}
                        onChange={this.handleChange}
                      />
                      <Form.Select
                        id="seniority"
                        fluid
                        search
                        label="Seniority"
                        options={data.seniorities}
                        placeholder="Seniority"
                        value={this.state.seniority}
                        onChange={this.handleChange}
                      />
                      <Form.Field>
                        <label>Location</label>
                        <input
                          id="location"
                          placeholder="Location"
                          type="text"
                          name="location"
                          value={this.state.location}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      <Form.TextArea
                        id="description"
                        label="description"
                        placeholder="Job description..."
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                      <Form.Field>
                        <label>Contact email</label>
                        <input
                          id="contact"
                          placeholder="john.doe@company.com"
                          type="text"
                          name="contact"
                          value={this.state.contact}
                          onChange={this.handleChangeInput}
                        />
                      </Form.Field>
                      {error && <Message
                        error
                        header="Error"
                        content={`There was a problem posting the job. ${error.message}`}
                      />}
                      <Message
                        success
                        header="Success"
                        content="You posted a new job."
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
          </PostJobQuery>
        </Container>
      </StyledFormContainer>
    );
  }
}


export default PostJob;
export { CREATE_JOB_MUTATION, StyledFormContainer };
