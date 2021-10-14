import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { MemoryControl } from './components/Memory/MemoryControl';
import { NeanderCoreContext } from './NeanderCoreContext';

const App: React.FC = () => {
  return(
    <NeanderCoreContext>
      <Header />
      <main>
        <Instructions />
        <ControlPanel />
        <MemoryControl />
      </main>
    </NeanderCoreContext>
  );
}

export default App;
