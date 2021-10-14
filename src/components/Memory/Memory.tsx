import React from 'react';
import { useNeander } from '../../useNeader';
import { MemoryCell } from './MemoryCell';

type Props = {
  showOP?: boolean;
  showP?: boolean;
  selected: number;
  selecting: boolean;
  onClick?: (addr: number)  => void;
}

export const Memory: React.FC<Props> = ({showOP, showP, selecting, selected, onClick}) => {
  const {
    memory,
  }  = useNeander();

  return (
    <table 
      style={{display: "inline-block", height:"350px", overflow:"auto"}}
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
              selected={selected === addr}
              selecting={selecting}
              showP={showP} 
              showOP={showOP}
              onClick={e => onClick?.(addr)}
            />
          )
        })}
      </tbody>
    </table>
  );
}