import { useState } from 'react';
import styled, { css } from 'styled-components';
import { darkModeVar, isLoggedInVar } from '../apollo';

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div``;

const ToggleButton = styled.button`
  color: red;
`;

const Login = () => {
  const [isWhite, setIsWhite] = useState(true);
  return (
    <Container isWhite={isWhite}>
      <Title isWhite={isWhite}>Login</Title>
      <ToggleButton
        onClick={() => {
          setIsWhite(!isWhite);
        }}
      >
        Log in
      </ToggleButton>
      <button onClick={() => darkModeVar(true)}>To dark</button>
      <button onClick={() => darkModeVar(false)}>To light</button>
    </Container>
  );
};

export default Login;
