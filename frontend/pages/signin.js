import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from '@emotion/styled';

const StyledButton = styled(Button)({
  color: 'red!important',
});

const SignInPage = () => {
  return (
    <div>
      Sign in page
      <StyledButton>Click Here</StyledButton>
    </div>
  );
};

export default SignInPage;
