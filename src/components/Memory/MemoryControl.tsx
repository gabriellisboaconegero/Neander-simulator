import React, { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import useBitComplement from '../../hooks/useBitComplement';
import { useNeander } from '../../hooks/useNeader';
import useValidAddr from '../../hooks/useValidAddr';
import { MemoryWrapper } from '../styles';
import { Memory } from './Memory';


export const MemoryControl: React.FC = () => {
  const {
    memory,
    updateMem,
    shiftMem
  }  = useNeander();

  const [instructionAddr, setInstructionAddr] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState(0);
  const isValidAddr = useValidAddr();
  const bitComplement = useBitComplement();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [selected]);

  function handleKeyDown(this: HTMLElement, ev: KeyboardEvent){
    
    switch (ev.key) {
      case "ArrowDown":
        handleClickOnMemoryCell(bitComplement(selected + 1));
        ev.preventDefault();
        break;

      case "ArrowUp":
        handleClickOnMemoryCell(bitComplement(selected - 1));
        ev.preventDefault();
        break;
    
      default:
        break;
    }
  }

  function handleClickOnMemoryCell(addr: number){
    setSelected(addr);
    setInstructionAddr(String(memory[addr].value));
    inputRef.current?.focus();
    inputRef.current?.select();
    if (selecting) return;
    setSelecting(true);
  }

  function handleNewInstructionInput(e: ChangeEvent<HTMLInputElement>){
    if (isValidAddr(e)){
      setInstructionAddr(e.target.value);
    }
  }

  function  handlePushNewInstructionToMem(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    handleClickOnMemoryCell(selected + 1);
    updateMem(selected, parseInt(instructionAddr) || 0)
  }
  const inputRef = useRef<HTMLInputElement>(null);
  
  return(
    <MemoryWrapper>
      <form
        onSubmit={handlePushNewInstructionToMem}
      >
        <Memory
          selected={selected}
          selecting={selecting}
          showOP
          showP
          onClick={handleClickOnMemoryCell}
        />
        <input
          onBlur={e => {
            setSelecting(false)
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          name="teste2"
          id="teste2"
          value={instructionAddr}
          onChange={handleNewInstructionInput}
          type="text"
          placeholder="Instruction number"
          autoComplete="off"
          onFocus={e => e.target.select()}
          onClick={e => handleClickOnMemoryCell(selected)}
        />
        <button type="button" onClick={e => shiftMem(selected, 1)}>Add mem line</button>
        <button type="submit">Set mem</button>
      </form>
      <div className="just_see">
        <Memory
          selected={selected}
          selecting={selecting}
          onClick={handleClickOnMemoryCell}
        />
      </div>
    </MemoryWrapper>

  );
}