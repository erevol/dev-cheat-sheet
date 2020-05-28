import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import senioritiesMock from '../mocks/__seniorities-mock.json';

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUTATION(
    $jobTitle: String!
    $company: String!
    $topics: String!
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
    topics: '',
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
            Post a Job
          </StyledHeader>
          <Mutation
            mutation={CREATE_JOB_MUTATION}
            variables={this.state}
          >
            {(createJob, { loading, error, called, data }) => (
              <Form size="large"
                onSubmit={async e => {
                  e.preventDefault();
                  const response = await createJob();
                  console.log(response.data.createJob.id);
                  this.setState({
                    company: '',
                    contact: '',
                    description: '',
                    jobTitle: '',
                    location: '',
                    seniority: '',
                    topics: '',
                  });
                }}
                error={error}
                loading={loading}
                success={called && data}
              >
                <Segment stacked>
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
                <Form.Field>
                  <label>Topics</label>
                  <input
                    id="topics"
                    placeholder="Topics separeted by comma"
                    type="text"
                    name="topics"
                    value={this.state.topics}
                    onChange={this.handleChangeInput}
                  />
                </Form.Field>
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
                  <label>Contact</label>
                  <input
                    id="contact"
                    placeholder="Contact"
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


export default PostJob;
export { CREATE_JOB_MUTATION };
