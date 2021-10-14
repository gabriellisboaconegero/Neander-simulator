import styled, { css } from "styled-components";

export const MemoryCellWrapper  = styled.tr<{selecting: boolean}>`
  ${props => {
    if (props.selecting){
      return css`
        background-color: lightblue;
      `
    }
  }}
`