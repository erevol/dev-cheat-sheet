import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const ALL_SENIORITIES_QUERY = gql`
  query ALL_SENIORITIES_QUERY {
    seniorities {
      id
      name
    }
  }
`;

const SenioritiesQuery = props => (
  <Query {...props} query={ALL_SENIORITIES_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

SenioritiesQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SenioritiesQuery;
export { ALL_SENIORITIES_QUERY };
