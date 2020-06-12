import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { lightenDarkenColor } from '../utils/color';
import theme from '../pages/theme';

const buttonStyles = {
  "red": `${theme.red};`,
  "green": `${theme.green};`,
  "yellow": `${theme.yellow};`
};

const colorModifier = ({ color }) => css`
  ${buttonStyles[color]}
`;

const StyledButton = styled.div`
  min-width: 100px;
  max-height: 30px;
  padding: 0 30px;
  background-color: ${colorModifier};
  display: inline-block;
  text-align: center;
  color: ${props => props.theme.white};
  border-radius: 10px;
  cursor: pointer;
  transform: skewX(-5deg);

  bottom: 10px;
  position: absolute;
  width: calc(50% - 10px);
  ${({ position }) => position === 'right' ? 'right: 0' : 'left: 0' };

  @media (min-width: 769px) {
    margin-left: 10px;
    position: initial;
    width: auto;
  }

  a {
    color: ${props => props.theme.white};
  }

  &:hover {
    background-color: ${({ color }) => lightenDarkenColor(buttonStyles[color], -0.2)};
    transition: background 0.2s ease-out;
  }
`;

const Button = ({ color, children, position }) => {
  return (
    <StyledButton color={color} position={position}>
      {children}
    </StyledButton>
  )
}

export default Button;
