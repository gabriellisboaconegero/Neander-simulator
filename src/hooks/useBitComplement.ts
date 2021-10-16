import { useNeander } from "./useNeader"

export default function useBitComplement(size: number=8){
  const {bitComplement} = useNeander();
  return (value: number) => {
    return bitComplement(value, size);
  }
}