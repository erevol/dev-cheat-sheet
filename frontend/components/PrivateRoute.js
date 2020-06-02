import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import SignIn from './SignIn';
import paragraph from '../static/paragraph.png';
import {
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';

const PrivateRoute = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if(loading) return <Segment>
                          <Dimmer active inverted>
                            <Loader size='medium'>Loading</Loader>
                          </Dimmer>
                          <Image src={paragraph} />
                        </Segment>
      if(!data.me) return <>
                            <Message
                              error
                              header="Error"
                              content="Please Sign In before Continuing."
                            />
                            <SignIn />
                          </>

      return props.children;
    }}
  </Query>
);

export default PrivateRoute;
