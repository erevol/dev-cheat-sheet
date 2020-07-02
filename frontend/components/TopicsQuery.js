import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const ALL_TOPICS_QUERY = gql`
  query ALL_TOPICS_QUERY {
    topics(orderBy: name_ASC) {
      id
      name
    }
  }
`;

const TopicsQuery = props => (
  <Query {...props} query={ALL_TOPICS_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

TopicsQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TopicsQuery;
export { ALL_TOPICS_QUERY };
