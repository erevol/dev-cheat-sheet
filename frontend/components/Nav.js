import Link from 'next/link';
import styled from '@emotion/styled';
import { Icon, Header } from 'semantic-ui-react';
import User from './User';
import SignOut from './SignOut';

const StyledNav = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;

  div.ui.header {
    padding: 10px 40px 0 0;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: bold;
    font-size: 1em;
    background: none;
    border: 0;
    font-family: 'JostSemiBold';
  }

  a {
    &:hover {
      color: ${props => props.theme.red};
    }
  }
  a,
  button {
    padding: 1.4rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    &:before {
      content: '';
      width: 2px;
      background: ${props => props.theme.grey1};
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.red};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
      @media (max-width: 700px) {
        margin-top: 1.2rem;
      }
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
        @media (max-width: 700px) {
          width: 60%;
        }
      }
    }
  }
  @media (max-width: 1300px) {
    font-size: 1.5rem;
    padding: 0 10px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledMobileNav = styled.div`
  margin: 10px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const Nav = () => {
  return (
    <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <>
          <StyledNav>
            {me && <Header size='medium'>👋&nbsp;&nbsp;&nbsp;Hi {me.name}!</Header>}
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
            {me && <Link href="/post-job">
              <a>Post a Job</a>
            </Link>}
            { me
              ?
                <SignOut />
              :
                <Link href="/signin">
                  <a>Sign in</a>
                </Link>
            }
          </StyledNav>
          <StyledMobileNav>
            <Link href="/about-us">
              <Icon name="question circle" size="huge" />
            </Link>
            {me && <Link href="/post-job">
              <Icon.Group size="huge">
                <Icon name="briefcase" />
                <Icon corner name="add" color="grey" />
              </Icon.Group>
            </Link>}
            <Link href="/signin">
              <Icon.Group size="huge">
                <Icon name="user" />
                <Icon corner name="sign-in" color="grey" />
              </Icon.Group>
            </Link>
          </StyledMobileNav>
        </>
      )
    }}
    </User>
  );
};

export default Nav;
