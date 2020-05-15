import Link from 'next/link';
import styled from '@emotion/styled';

const StyledNav = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
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
    @media (max-width: 700px) {
    }
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
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
    padding: 0 10px;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <Link href="/about-us">
        <a>About Us</a>
      </Link>
      <Link href="/post-job">
        <a>Post a Job</a>
      </Link>
      <Link href="/signin">
        <a>Sign in</a>
      </Link>
    </StyledNav>
  );
};

export default Nav;
