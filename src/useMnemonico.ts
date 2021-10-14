import { MNEMONICOS } from "./NeanderCoreContext";
import { useNeander } from "./useNeader";

const useMnemonico = () => {
  const {memory} = useNeander();
  return (addr: number ) => {
    return MNEMONICOS[(memory[addr].value >> 4) << 4] || MNEMONICOS[0];
  }
}

export default useMnemonico;