import styled from "styled-components";
// -------- Main -------------
export const MainWrapper = styled.main`
  display: flex;
  /* align-items: flex-start; */
  align-content: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 24px;

  & > *{
    flex: 3;
    flex-basis: 50%;
    align-self: center;
  }
`

// ------- Instructions -----

export const InstructionsWrapper = styled.ul`
  flex: 1;
  width: 350px;
  border: 5px solid #363636;
  border-radius: 16px;

  list-style: none;
  padding: 8px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li{
    flex: 1;
    flex-basis: 25%;
    text-align: center;
    padding: 5px 0;
  }
`

// ------- Control Panel ------

export const ControlPanelWrapper = styled.div`
  width: 60%;
  max-width: 300px;
  fieldset{
    padding: 10px 16px;
  }
`

export const FieldsetStyled = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const AcPanel = styled(FieldsetStyled)`
  .acValues{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    button{
      align-self: flex-end;
      padding: 4px 10px;
      cursor: pointer;
    }
  }

  .setAc{
    input{
      margin-right: 16px;
    }
  }
`

const PanelBlocksFontStyle = `
  font-size: 20px;
  font-weight: 600;
`

export const FlagsPanel = styled(FieldsetStyled)`
  flex-direction: row;
  gap: 12px;
  justify-content: space-evenly;

  span{
    width: 60px;
    aspect-ratio: 1;
    text-align: center;
    line-height: 60px;
    color: white;
    background-color: red;

    border-radius: 50%;
    border: 3px inset #363636;
    ${PanelBlocksFontStyle}

    &.active{
      background-color: green;
    }
  }
`

export const ControlsPanel = styled(FieldsetStyled)`
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
`

export const NumberInBox = styled.span`
  ${PanelBlocksFontStyle}
  padding: 14px;
  border: 2px groove threedface;
`

// ----------- Memory ------------

export const MemoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  width: 600px;
  height: 100%;

  form, .just_see{
    flex: 1;
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .just_see{
    flex-basis: 40%;
  }
`

export const MemoryStyled = styled.table`
  display: block;
  /* flex: 1; */
  flex-basis: 70%;
  /* align-self: stretch; */
  height: 350px;
  overflow: auto;
`