import React from 'react';
import { MNEMONICOS } from '../NeanderCoreContext';

export const Instructions: React.FC = () => {
  return(
    <div>
      {Object.entries(MNEMONICOS).map(([op_code, op], id) => {
        return(
          <p key={`instruction_map_item_${id}`}><strong>{op.op}</strong>: {op_code}</p>
        )
      })}
    </div>
  );
}