import React, { useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { Memory } from './components/Memory';
import { NeanderCoreContext } from './NeanderCoreContext';

const App: React.FC = () => {
  return(
    <NeanderCoreContext>
      <Header />
      <main>
        <Instructions />
        <ControlPanel />
        <Memory showOP  showP/>
        <Memory />
      </main>
    </NeanderCoreContext>
  );
}

export default App;
