import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNeander } from '../../useNeader';
import { Memory } from './Memory';


export const MemoryControl: React.FC = () => {
  const {
    memory,
    updateMem,
  }  = useNeander();

  const [value, setValue] = useState(0);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setValue(memory[selected].value);
    inputRef.current?.select();
  }, [selected]);

  function handleKeyDown(this: HTMLElement, ev: KeyboardEvent){
    
    switch (ev.key) {
      case "ArrowDown":
        setSelected(prev => {
          return prev > memory.length? prev: prev + 1
        });
        ev.preventDefault();
        break;

      case "ArrowUp":
        setSelected(prev => {
          return prev <= 0? prev: prev - 1
        });
        ev.preventDefault();
        break;
    
      default:
        break;
    }
  }

  function handleClickOnMemoryCell(addr: number){
    setSelected(addr);
    inputRef.current?.focus();
    if (selecting) return;
    setSelecting(true);
    
  }
  const inputRef = useRef<HTMLInputElement>(null);
  
  return(
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleClickOnMemoryCell(selected + 1);
          updateMem(selected, value)
        }}
      >
        <Memory
          selected={selected}
          selecting={selecting}
          showOP
          showP
          onClick={handleClickOnMemoryCell}
        />
        <label htmlFor="teste2">Addr: {selected}</label>
        <input
          onBlur={e => {
            setSelecting(false)
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          type="number"
          name="teste2"
          id="teste2"
          min="0"
          max="255"
          value={value}
          onChange={e => setValue(parseInt(e.target.value))}
        />
        <button type="submit">Set mem</button>
      </form>
      <Memory 
        selected={selected}
        selecting={selecting}
        onClick={handleClickOnMemoryCell}
      />
    </div>

  );
}