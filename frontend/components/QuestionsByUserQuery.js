import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const QUESTIONS_BY_USER_QUERY = gql`
  query QUESTIONS_BY_USER_QUERY($id: ID!) {
    questionsByUser(where: {id: $id}) {
      id
      name
      questions {
        id
        title
        answer
        seniority { id name }
        topic { id name }
        votes
        source
        createdAt
        updatedAt
      }
    }
  }
`;

const QuestionsByUserQuery = props => (
  <Query {...props}
    query={QUESTIONS_BY_USER_QUERY}
    variables={{
      id: props.id
    }}
  >
    {payload => props.children(payload)}
  </Query>
);

QuestionsByUserQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default QuestionsByUserQuery;
export { QUESTIONS_BY_USER_QUERY };
