import { useContext } from "react";
import { NeanderContext } from "./NeanderCoreContext";

export const useNeander = () => {
  return useContext(NeanderContext)
}