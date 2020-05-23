import Nav from './Nav';
import Link from 'next/link';
import styled from '@emotion/styled';
import Router from 'next/router';
import NProgress from 'nprogress';
import logo from '../static/logo.svg';
import { Image } from 'semantic-ui-react';

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
  margin: 0 auto 0 15px;


  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    span {
      display: none;
      text-transform: uppercase;
    }

    @media (min-width: 769px) {
      padding: 0.5rem 1rem;

      span {
        display: inline;
        margin-left: 20px;
      }
    }

    &:hover {
      color: ${props => props.theme.red};
    }
  }

  img {
    width: 60px;
    height: auto;

    @media (min-width: 769px) {
      width: 40px;
      height: auto;
    }
  }
  @media (min-width: 769px) {
    max-height: 60px;
  }
`;

const StyledHeader = styled.div`
  .bar {
    display: flex;
    justify-content: flex-end;
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
          <Link href="/"><a>
            <Image src={logo} verticalAlign="middle" />
            <span>Get your answers!</span>
          </a></Link>
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
