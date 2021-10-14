import React, { createContext, useEffect, useState } from "react";

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
  updateMem: (addr: number, value: number) => void;
  zerarPc: () => void;
  run: () => void
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

  const [halt, setHalt] = useState(true);
  const [maxDepth, setMaxDepth] = useState(300);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    setFlagN(colocarSinal(ac) < 0);
    setFlagZ(ac === 0);
  }, [ac]);

  useEffect(() => {
    if(!halt && pc < memory.length && depth <= maxDepth){
      step();
      console.log("Dando um passo", depth);
    }else if(pc >= memory.length ||  depth > maxDepth){
      setHalt(true);
    }
  }, [halt, pc]);

  function colocarSinal(number: number): number{
    return number >= 128? -(255 - number): number
  }

  function changeMemoryType(addr: number, new_type: OpType){
    memory[addr].type = new_type;
  }

  function run(){
    setHalt(false);
  }

  function step(){
    let localPc = pc;
    let op = memory[localPc];
    let op_name = MNEMONICOS[(memory[localPc].value >> 4) << 4] || MNEMONICOS[0];
    let next_op = memory[localPc + 1];
    if (op.type ==  OpType.BINARY){
      localPc += 2
    }else{
      localPc += 1;
    }
    setDepth(prev => prev + 1);

    switch (op_name.op) {
      case "NOP":
        console.log("Não fez nada")
        break;
      case "STA":
        op_sta(next_op.value);
        break;
      case "LDA":
        op_load(next_op.value);
        break;
      case "ADD":
        op_add(next_op.value);
        break;
      case "OR":
        op_or(next_op.value);
        break;
      case "AND":
        op_and(next_op.value);
        break;
      case "NOT":
        op_not();
        break;
      case "JMP":
        localPc = next_op.value
        break;
      case "JN":
        if (flagN) localPc = next_op.value
        break;
      case "JZ":
        if (flagZ) localPc = next_op.value
        break;
      case "HLT":
        op_hlt();
        break;
    
      default:
        break;
    }
    if (pc < memory.length){
      setPc(localPc);
    }
  }

  function op_load(addr: number){
    setAc(memory[addr].value);
  }

  function op_sta(addr: number){
    updateMem(addr, ac);
  }

  function op_add(addr: number){
    setAc(prev => prev + memory[addr].value);
  }

  function op_or(value: number){
    setAc(prev => prev | value);
  }

  function op_and(value: number){
    setAc(prev => prev & value);
  }

  function op_not(){
    setAc(prev => ~prev);
  }

  // function op_jmp(addr: number){   just to know that they are operations
  //   setPc(addr);
  // }

  // function op_jn(addr: number){
  //   if (flagN){
  //     setPc(addr);
  //   }
  // }

  // function op_jz(addr: number){
  //   if (flagZ){
  //     setPc(addr);
  //   }
  // }

  function op_hlt(){
    setHalt(true);
  }

  function zerarAc(){
    setAc(0);
  }

  function zerarPc(){
    setPc(0);
  }

  function updateMem(addr: number, value: number){
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
        if (prev[pos].type === OpType.BINARY || pos === addr){
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
    updateMem,
    zerarPc,
    run
  }
  return(
    <NeanderContext.Provider value={contextValues} >
      {children}
    </NeanderContext.Provider >
  );
}