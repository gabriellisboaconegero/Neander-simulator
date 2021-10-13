import React, { AllHTMLAttributes, useState } from 'react';
import { MemoryCellType, OpType } from '../NeanderCoreContext';
import useMnemonico from '../useMnemonico';
import { useNeander } from '../useNeader';

type Props = AllHTMLAttributes<HTMLElement> & {
  addr: number,
  mem_data: MemoryCellType,
  showP?: boolean,
  showOP?: boolean
}

export const MemoryCell: React.FC<Props> = ({
  addr,
  mem_data,
  showOP,
  showP,
  ...rest
}) => {
  const mnemonicoParser = useMnemonico();
  const {pc} = useNeander();

  return(
    <tr {...rest}>
      {showP && <td>{pc === addr && ">"}</td>}
      <td>{addr}</td>
      <td>{mem_data.value}</td>
      {showOP && 
        <td>{mem_data.type == OpType.ADDR? "" : mnemonicoParser(addr).op}</td>
      }
    </tr>
  );
}