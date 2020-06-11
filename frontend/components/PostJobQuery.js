import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const POST_JOB_QUERY = gql`
  query POST_JOB_QUERY {
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

const PostJobQuery = props => (
  <Query {...props} query={POST_JOB_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

PostJobQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PostJobQuery;
export { POST_JOB_QUERY };
