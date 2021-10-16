import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNeander } from '../hooks/useNeader';
import useValidAddr from '../hooks/useValidAddr';
import { AcPanel, ControlPanelWrapper, ControlsPanel, FlagsPanel, NumberInBox, FieldsetStyled } from './styles';

export const ControlPanel: React.FC = () => {
  const {
    pc,
    ac,
    colocarSinal,
    flagN,
    flagZ,
    step,
    setNewAc,
    zerarPc,
    run
  } = useNeander();
  const [addr, setAddr] = useState("");
  const isValidAddr = useValidAddr();

  function Digit3Number(number: string | number){
    return number.toString().padStart(3, '0')
  }

  function handleNewAddrInput(e: ChangeEvent<HTMLInputElement>){
    if (isValidAddr(e)){
      setAddr(e.target.value);
    }
  }

  function handleSetNewAc(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    setNewAc(parseInt(addr) || 0);
    setAddr("");
  }

  return(
    <ControlPanelWrapper>
      <AcPanel>
        <legend>AC:</legend>
        <div className="acValues">
          <NumberInBox>{ac}</NumberInBox>
          <button onClick={e => setNewAc(0)} >Zerar</button>
          <NumberInBox>{colocarSinal(ac)}</NumberInBox>
        </div>
        <form 
          className="setAc"
          onSubmit={handleSetNewAc}
        >
          <input
            type="text"
            name="set_ac"
            id="set_ac"
            placeholder="New AC value[-128, 255]"
            autoComplete="off"
            value={addr}
            onFocus={e => e.target.select()}
            onChange={handleNewAddrInput}
          />
          <button type="submit">Set</button>
        </form>
      </AcPanel>
      <FieldsetStyled>
        <legend>PC:</legend>
        <NumberInBox>{Digit3Number(pc)}</NumberInBox>
        <button onClick={e => zerarPc()} >Zerar</button>
      </FieldsetStyled>
      <FlagsPanel>
        <legend>Flags:</legend>
        <span className={`${flagN? "active":""}`}>N</span>
        <span className={`${flagZ? "active":""}`}>Z</span>
      </FlagsPanel>
      <ControlsPanel>
        <legend>Controls:</legend>
        <button onClick={e => step()}>Step</button>
        <button onClick={e => run()}>Run</button>
      </ControlsPanel>
    </ControlPanelWrapper>
  );
}