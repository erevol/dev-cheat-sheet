import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CREATE_QUESTION_QUERY = gql`
  query CREATE_QUESTION_QUERY {
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

const CreateQuestionQuery = props => (
  <Query {...props} query={CREATE_QUESTION_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

CreateQuestionQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateQuestionQuery;
export { CREATE_QUESTION_QUERY };
