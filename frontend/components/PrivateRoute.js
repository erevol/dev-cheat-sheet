import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import styled from '@emotion/styled';
import SignIn from './SignIn';
import paragraph from '../static/paragraph.png';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';

const StyledContainer = styled.div`
`;

const PrivateRoute = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if(loading) return <Segment>
                          <Dimmer active inverted>
                            <Loader size='medium'>Loading</Loader>
                          </Dimmer>
                          <Image src={paragraph} />
                        </Segment>
      if(!data.me) return <StyledContainer>
                            <Message
                              error
                              header="Error"
                              content="Please Sign In before Continuing."
                            />
                            <SignIn />
                          </StyledContainer>

      return props.children;
    }}
  </Query>
);

export default PrivateRoute;
