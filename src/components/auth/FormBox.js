import styled from 'styled-components';
import { BaseBox } from '../shared';

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-top: 35px;
  margin-bottom: 10px;
  form {
    margin-top: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

const FormBox = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormBox;
