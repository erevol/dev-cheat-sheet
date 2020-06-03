import Header from './Header';
import Meta from './Meta';
import styled from '@emotion/styled';
import Footer from './Footer';

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
          {this.props.children}
        </Inner>
        <Footer />
      </StyledPage>
    );
  };
};

export default Page;
