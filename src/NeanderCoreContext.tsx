import React, { createContext, memo, useEffect, useState } from "react";
import { PageWrapper } from "./styles";

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
  setNewAc: (value: number) => void;
  changeMemoryType: (addr: number, new_type: OpType) => void;
  updateMem: (addr: number, value: number) => void;
  zerarPc: () => void;
  run: () => void;
  bitComplement: (value: number, size: number) => number;
  downloadMem: () => void;
  shiftMem: (addrToShift: number, shiftDirection: number) => void;
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
    return number >= 128? -(memory.length - number): number
  }

  function changeMemoryType(addr: number, new_type: OpType){
    memory[addr].type = new_type;
  }

  function upDateAc(stateChangerOrPrev: React.SetStateAction<number>){
    if (typeof stateChangerOrPrev === "number"){
      stateChangerOrPrev = bitComplement(stateChangerOrPrev);
      setAc(stateChangerOrPrev);
    }else{     
      let stateChanger = stateChangerOrPrev;
      setAc(prevState => bitComplement(stateChanger(bitComplement(prevState))));
    }
  }

  function run(){
    setHalt(false);
  }

  function step(){
    let localPc = pc;
    let op = memory[localPc];
    let op_name = MNEMONICOS[(memory[localPc].value >> 4) << 4] || MNEMONICOS[0];
    let next_op = memory[localPc + 1];
    if (op.type === OpType.BINARY){
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
    upDateAc(memory[addr].value);
  }

  function op_sta(addr: number){
    updateMem(addr, ac);
  }

  function op_add(addr: number){
    upDateAc(prev => prev + memory[addr].value);
  }

  function op_or(value: number){
    upDateAc(prev => prev | value);
  }

  function op_and(value: number){
    upDateAc(prev => prev & value);
  }

  function op_not(){
    upDateAc(prev => ~prev);
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

  function setNewAc(value: number){
    upDateAc(value);
  }

  function zerarPc(){
    setPc(0);
  }

  function bitComplement(value: number, size: number=8){
    size = 2**size;
    if (value < 0){
      value = size + value;
    }
    return value & (size - 1);
  }

  function shiftMem(addrToShift: number, shiftDirection: number){
    if (addrToShift === memory.length - 1 || memory[addrToShift].type === OpType.BINARY){
      return;
    }
    setMemory(prev => {
      const tempMem = prev.map(e => e);

      tempMem[addrToShift + 1] = {
        value: 0,
        type: OpType.UNARY
      }
      for (let pos = addrToShift + 2;  pos < memory.length;  pos++){
        tempMem[pos] = prev[pos - 1];
      }
      return setMem(0, tempMem[0].value, tempMem);
    });
  }

  function setMem(addr: number, newValue: number, prev: MemoryCellType[]){
    prev[addr].value = newValue;
    for (let pos = addr; pos < prev.length; pos++){
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
    return prev
  }

  function updateMem(addr: number, newValue: number){
    newValue = bitComplement(newValue);
    addr = bitComplement(addr);
    setMemory(prev => setMem(addr, newValue, prev));
  }

  function downloadMem(){
    let memText = "";
    memory.forEach(({value, type}, id) => {
      const op = MNEMONICOS[(value >> 4) << 4] || MNEMONICOS[0];
      let opeartionStr = op.op;
      if (id < memory.length - 1){
        if (type === OpType.ADDR){
          opeartionStr = "";
        }else if (type === OpType.BINARY){
          opeartionStr += ` ${memory[id + 1].value}`;
        }
      }
      memText += `${id}:${value} ${opeartionStr}\n`;
    });

    const blob = new Blob([memText], {type: 'text'});
    const fileDowloadUrl = URL.createObjectURL(blob);
    const downloadElment = document.createElement("a");
    downloadElment.href = fileDowloadUrl;
    downloadElment.download = "neander_mem.txt";
    document.body.appendChild(downloadElment);
    downloadElment.click();
    setTimeout(() => {
      URL.revokeObjectURL(fileDowloadUrl);
      document.body.removeChild(downloadElment);
    }, 0);
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
    setNewAc,
    changeMemoryType,
    updateMem,
    zerarPc,
    run,
    bitComplement,
    downloadMem,
    shiftMem
  }
  return(
    <NeanderContext.Provider value={contextValues} >
      <PageWrapper>
        {children}
      </PageWrapper>
    </NeanderContext.Provider >
  );
}