import Nav from './Nav';
import Link from 'next/link';
import styled from '@emotion/styled';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skewX(-5deg);
  a {
    padding: 0.5rem 1rem;
    border: 2px solid ${props => props.theme.red};
    color: ${props => props.theme.black};
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 10px;
  }

  @media(max-width: 1300px) {
    margin: 0;
    text-align: center;
    justify-self: flex-start;
    margin-left: 15px;
  }
`;

const StyledHeader = styled.div`
  .bar {
    display: grid;
    column-gap: 10px;
    grid-template-columns: 1fr 2fr;
    justify-items: flex-start;
    align-items: center;
    border-bottom: 2px solid ${props => props.theme.grey1};
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.grey1};
    justify-content: space-between;
    align-items: stretch;
    p {
      margin-left: 2rem;
      line-height: 3;
      opacity: 0.4;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/"><a>D.C.S.</a></Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>&#x1f50e; search...</p>
      </div>
    </StyledHeader>
  );
};

export default Header;
