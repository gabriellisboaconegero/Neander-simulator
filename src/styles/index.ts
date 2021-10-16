import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background: #EBEBEB;
    color: #363636;
  }

  button{
    padding: 4px 10px;
    cursor: pointer;
    border: 1px solid #363636;
    border-radius: 2px;

    &:hover{
      background-color: #D6D6D6;
    }
  }
`

export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  padding: 40px 0;

  h1{
    padding: 20px;
  }
  /* gap: 16px; */
`