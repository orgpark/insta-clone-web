import styled from 'styled-components';

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const Separator = styled.div`
  margin: 15px 0 20px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0 10px;
    color: #8e8e8e;
  }
`;

export const FatLink = styled.div`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;
