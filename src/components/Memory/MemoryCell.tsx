import React, { AllHTMLAttributes } from 'react';
import { MemoryCellType, OpType } from '../../NeanderCoreContext';
import useMnemonico from '../../useMnemonico';
import { useNeander } from '../../useNeader';
import { MemoryCellWrapper } from './styles';

type Props = AllHTMLAttributes<HTMLElement> & {
  addr: number;
  mem_data: MemoryCellType;
  showP?: boolean;
  showOP?: boolean;
  selecting: boolean
}

export const MemoryCell: React.FC<Props> = ({
  addr,
  mem_data,
  showOP,
  showP,
  selected,
  selecting,
  onClick,
}) => {
  const mnemonicoParser = useMnemonico();
  const {pc, memory} = useNeander();

  return(
    <MemoryCellWrapper onClick={onClick} selecting={selected && selecting? true : false}>
      {showP && <td>{pc === addr && ">"}</td>}
      <td>{addr}</td>
      <td>{mem_data.value}</td>
      {showOP && 
        <td>
          {mem_data.type === OpType.ADDR? "" : (
            <>
              <span>{mnemonicoParser(addr).op} &nbsp;</span>
              {mem_data.type === OpType.BINARY && addr < memory.length && <span>{memory[addr + 1].value}</span>}
            </>
          )}
        </td>
      }
    </MemoryCellWrapper>
  );
}