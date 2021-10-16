import { ChangeEvent } from "react";

export default function useValidAddr(){

  return (e: ChangeEvent<HTMLInputElement>) => {
    let nativeEvent = e.nativeEvent as InputEvent
    const value = parseInt(e.target.value);
    // ------- Se o evento é do tipo input -------
    if (nativeEvent.type === "input"){
      // -------- Se for backspace ou o caratere `-` --------
      if (nativeEvent.data === null || nativeEvent.data === "-"){
        return true;
        // -------- Se o valor de value é NaN ------------
      }
      if ( !isNaN(value) ){
        // --------- Se o caractere passado for um numero -----------
        if (!isNaN(parseInt(nativeEvent.data))){
          return true;
        }
      }
    }
    return false;
  }
}

