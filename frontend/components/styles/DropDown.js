import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.grey1};
`;

const DropDownItem = styled.div`
  z-index: 99;
  border-bottom: 1px solid ${props => props.theme.grey1};
  background: ${props => (props.highlighted ? props.theme.offWhite : props.theme.white)};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.red : props.theme.white)};
  cursor: pointer;
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px ${props => props.theme.yellow};
  }

  to {
    box-shadow: 0 0 10px 1px ${props => props.theme.yellow};
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 1.4rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
