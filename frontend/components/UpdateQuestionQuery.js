import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const UPDATE_QUESTION_QUERY = gql`
  query UPDATE_QUESTION_QUERY($id: ID!) {
    question(where: {id: $id}) {
      id
      title
      answer
      seniority { id name }
      topic { id name }
      votes
      source
    }
    topics {
      key: id
      text: name
      value: name
    }
    seniorities {
      key: id
      text: name
      value: name
    }
  }
`;

const UpdateQuestionQuery = props => (
  <Query {...props}
    query={UPDATE_QUESTION_QUERY}
    variables={{
      id: props.id
    }}
  >
    {payload => props.children(payload)}
  </Query>
);

UpdateQuestionQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default UpdateQuestionQuery;
export { UPDATE_QUESTION_QUERY };
