import Header from './Header';
import Meta from './Meta';
import styled from '@emotion/styled';
import Footer from './Footer';
import TopicsList from './TopicsList';
import JobsList from './JobsList';
import {
  Grid,
} from 'semantic-ui-react';

const StyledPage = styled.div`
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends React.Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <Header />
        <Inner>
          <Grid stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              {this.props.children}
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <TopicsList />
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <JobsList />
            </Grid.Row>
          </Grid>
        </Inner>
        <Footer />
      </StyledPage>
    );
  };
};

export default Page;
