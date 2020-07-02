import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const ALL_QUESTIONS_QUERY = gql`
  query ALL_QUESTIONS_QUERY($id: ID!) {
    questions(where: {seniority: {id: $id}}) {
      id
      title
      answer
      seniority { id name }
      topic { id name }
      votes
      source
    }
  }
`;

const QuestionsBySeniorityQuery = props => (
  <Query {...props}
    query={ALL_QUESTIONS_QUERY}
    variables={{
      id: props.id
    }}
  >
    {payload => props.children(payload)}
  </Query>
);

QuestionsBySeniorityQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default QuestionsBySeniorityQuery;
export { ALL_QUESTIONS_QUERY };
