import React from 'react';
import { MNEMONICOS } from '../NeanderCoreContext';
import { InstructionsWrapper } from './styles';

export const Instructions: React.FC = () => {
  return(
    <InstructionsWrapper>
      {Object.entries(MNEMONICOS).map(([op_code, op], id) => {
        return(
          <li key={`instruction_map_item_${id}`}><strong>{op.op}</strong>: {op_code}</li>
        )
      })}
    </InstructionsWrapper>
  );
}