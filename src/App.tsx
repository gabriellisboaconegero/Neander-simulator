import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Instructions } from './components/Instructions';
import { MemoryControl } from './components/Memory/MemoryControl';
import { MainWrapper } from './components/styles';
import { NeanderCoreContext } from './NeanderCoreContext';
import { GlobalStyles } from './styles';

const App: React.FC = () => {
  const version = process.env.REACT_APP_VERSION
  return(
    <NeanderCoreContext>
      <GlobalStyles />
      <h1>Neander Simulator Version {version}</h1>
      <MainWrapper>
        <Instructions />
        <ControlPanel />
        <MemoryControl />
      </MainWrapper>
    </NeanderCoreContext>
  );
}

export default App;
