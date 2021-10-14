import React, { useState } from 'react';
import { useNeander } from '../useNeader';

export const ControlPanel: React.FC = () => {
  const {
    pc,
    ac,
    colocarSinal,
    flagN,
    flagZ,
    step,
    zerarAc,
    op_load,
    zerarPc,
    run
  } = useNeander();
  const [addr, setAddr] = useState(0);

  function Digit3Number(number: string | number){
    return number.toString().padStart(3, '0')
  }

  return(
    <div>
      <div className="ac_panel">
        <div>
          <p>AC: {ac}</p>
          <p>AC(Com sinal): {colocarSinal(ac)}</p>
        </div>
        <button onClick={e => zerarAc()} >Zerar AC</button>
        <label htmlFor="set_ac">Set Ac:</label>
        <input 
          type="number" 
          name="set_ac" 
          id="set_ac" 
          min="0" 
          value={addr}
          onChange={e => setAddr(parseInt(e.target.value))}
        />
        <button onClick={e => op_load(addr)} >Set AC</button>
      </div>
      <div className="pc_panel">
        <p>PC: {Digit3Number(pc)}</p>
      </div>
      <div className="flags">
        <span>N: {flagN? "True": "False"}</span>
        <span>Z: {flagZ? "True": "False"}</span>
      </div>
      <div className="controls">
        <button onClick={e => step()} >Step</button>
        <button onClick={e => zerarPc()} >Zerar Pc</button>
        <button onClick={e => run()}>Run</button>
      </div>
    </div>
  );
}