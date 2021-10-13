import React, { KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import useMnemonico from '../useMnemonico';
import { useNeander } from '../useNeader';
import { MemoryCell } from './MemoryCell';

type Props = {
  showOP?: boolean;
  showP?: boolean
}

export const Memory: React.FC<Props> = ({showOP, showP}) => {
  const {
    pc,
    memory,
    setMem
  }  = useNeander();

  const [addr, setAddr] = useState(0);
  const [value, setValue] = useState(0);

  const mnemonicoParser = useMnemonico();

  function handleKeys(this: HTMLElement ,e: globalThis.KeyboardEvent){
    console.log(e.key)
  }

  useEffect(() => {
    document.documentElement.addEventListener("keypress", handleKeys)

    return () => {
      document.documentElement.removeEventListener("keypress", handleKeys);
    }
  }, []);
  
  const tableRef = useRef<HTMLTableElement>(null);

  return(
    <div>
      <form>
        <table 
          style={{display: "inline-block", height:"350px", overflow:"auto"}}
          ref={tableRef}
        >
          <thead>
            <tr>
              {showP && <th>P</th>}
              <th>Address</th>
              <th>Data</th>
              {showOP && <th>Operation</th>}
            </tr>
          </thead>
          <tbody>
            {memory.map((data, addr) => {
              return(
                <MemoryCell 
                  key={`${addr}_${data.value}`} 
                  mem_data={data} 
                  addr={addr} 
                  showOP={showOP} 
                  showP={showP} 
                  onClick={e => {
                    setAddr(addr);
                  }}
                  onFocus={e => console.log(e)}
                />
              )
            })}
          </tbody>
        </table>
        <label htmlFor="teste1">Addr</label>
        <input 
          type="number" 
          name="teste1" 
          id="teste1"
          min="0"
          max="255"
          value={addr}
          onChange={e => setAddr(parseInt(e.target.value))}
        />
        <label htmlFor="teste2">valor</label>
        <input 
          type="number" 
          name="teste2" 
          id="teste2" 
          min="0"
          max="255"
          value={value}
          onChange={e => setValue(parseInt(e.target.value))}
        />
        <button type="submit" onClick={e => setMem(addr, value)}>Set mem</button>
      </form>
    </div>
  );
}