import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const ALL_JOBS_QUERY = gql`
  query ALL_JOBS_QUERY {
    jobs {
      id
      jobTitle
      company
      location
      description
      contact
      topics { name }
      seniority { name }
    }
  }
`;

const JobsQuery = props => (
  <Query {...props} query={ALL_JOBS_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

JobsQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default JobsQuery;
export { ALL_JOBS_QUERY };
