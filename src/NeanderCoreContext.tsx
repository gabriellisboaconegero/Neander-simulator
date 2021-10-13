import React, { createContext, useState } from "react";

export enum OpType {
  BINARY,
  UNARY,
  ADDR
}

export type MnemonicoType = {
  [x: number]: {
    op: string,
    op_type: OpType
  }
}

export type MemoryCellType = {
  value: number,
  type: OpType
}


export const MNEMONICOS: MnemonicoType = {
  0:{
   op: "NOP",
   op_type: OpType.UNARY
  },
  16:{
   op: "STA",
   op_type: OpType.BINARY
  },
  32:{
   op: "LDA",
   op_type: OpType.BINARY
  },
  48:{
   op: "ADD",
   op_type: OpType.BINARY
  },
  64:{
   op: "OR",
   op_type: OpType.BINARY
  },
  80:{
   op: "AND",
   op_type: OpType.BINARY
  },
  96:{
   op: "NOT",
   op_type: OpType.UNARY
  },
  128:{
   op: "JMP",
   op_type: OpType.BINARY
  },
  144:{
   op: "JN",
   op_type: OpType.BINARY
  },
  160:{
   op: "JZ",
   op_type: OpType.BINARY
  },
  240:{
   op: "HLT",
   op_type: OpType.UNARY
  }
}

type NeanderContextType = {
  ac: number;
  pc: number;
  memory: MemoryCellType[];
  flagN: boolean;
  flagZ: boolean;
  colocarSinal: (number: number) => number;
  step: () => void;
  op_load: (addr: number) => void;
  zerarAc: () => void;
  changeMemoryType: (addr: number, new_type: OpType) => void;
  setMem: (addr: number, value: number) => void;
}

export const NeanderContext = createContext<NeanderContextType>({} as NeanderContextType);

export const NeanderCoreContext: React.FC = ({children}) => {

  const [pc, setPc] = useState(0);
  const [ac, setAc] = useState(0);
  const [memory, setMemory] = useState(() => {
    const mem = new Array<MemoryCellType>(256);
    for (let i = 0; i < mem.length; i++) {
      mem[i] = {
        value: 0,
        type: OpType.UNARY
      }
    }
    return mem;
  });
  const [flagN, setFlagN] = useState(colocarSinal(ac) < 0);
  const [flagZ, setFlagZ] = useState(ac === 0);

  function colocarSinal(number: number): number{
    return number >= 128? -(255 - number): number
  }

  function changeMemoryType(addr: number, new_type: OpType){
    memory[addr].type = new_type;
  }

  function step(){
    if (pc < memory.length){
      setPc(prev => prev + 1);
    }
  }

  function op_load(addr: number){
    addr %= 255;
    setAc(memory[addr].value);
  }

  function zerarAc(){
    setAc(0);
  }

  function setMem(addr: number, value: number){
    if (addr <  0 || addr > 255){
      return
    }
    setMemory(prev => {
      prev[addr].value = value;
      for (let pos=addr; pos < prev.length; pos++){
        const op = MNEMONICOS[(prev[pos].value >> 4) << 4] || MNEMONICOS[0];
        if (pos === 0){
          prev[pos].type = op.op_type
        }else{
          const prev_mem = prev[pos - 1];
          if(prev_mem.type === OpType.BINARY){
            prev[pos].type = OpType.ADDR
          }else{
            prev[pos].type = op.op_type
          }
        }
        if (prev[pos].type == OpType.BINARY || pos === addr){
          continue;
        }
        break
      }
      return [...prev]
    });
  }

  const contextValues: NeanderContextType = {
    ac,
    flagN,
    flagZ,
    memory,
    pc,
    colocarSinal,
    op_load,
    step,
    zerarAc,
    changeMemoryType,
    setMem
  }
  return(
    <NeanderContext.Provider value={contextValues} >
      {children}
    </NeanderContext.Provider >
  );
}