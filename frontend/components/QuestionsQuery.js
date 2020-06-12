import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const ALL_QUESTIONS_QUERY = gql`
  query ALL_QUESTIONS_QUERY {
    questions {
      id
      title
      seniority { id name }
    }
  }
`;

const QuestionsQuery = props => (
  <Query {...props} query={ALL_QUESTIONS_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

QuestionsQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default QuestionsQuery;
export { ALL_QUESTIONS_QUERY };
