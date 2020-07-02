import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const TOP_QUESTION_QUERY = gql`
  query TOP_QUESTION_QUERY {
    questions(first: 1, orderBy: votes_DESC){
      id
      title
      answer
      topic { id name }
      seniority { id name }
      likes
      votes
    }
  }
`;

const TopQuestionQuery = props => (
  <Query {...props} query={TOP_QUESTION_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

TopQuestionQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TopQuestionQuery;
export { TOP_QUESTION_QUERY };
