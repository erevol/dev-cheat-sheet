import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const ALL_QUESTIONS_QUERY = gql`
  query ALL_QUESTIONS_QUERY($id: ID!) {
    questions(where: {topic: {id: $id}}) {
      id
      title
      answer
      seniority { id name }
      topic { id name }
      votes
    }
  }
`;

const QuestionsByTopicQuery = props => (
  <Query {...props}
    query={ALL_QUESTIONS_QUERY}
    variables={{
      id: props.id
    }}
  >
    {payload => props.children(payload)}
  </Query>
);

QuestionsByTopicQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default QuestionsByTopicQuery;
export { ALL_QUESTIONS_QUERY };
