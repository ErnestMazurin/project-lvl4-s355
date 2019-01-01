import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import MsgPanel from './MsgPanel';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-2">
        <Channels />
      </div>
      <div className="col-10">
        <MsgPanel />
        <Chat />
      </div>
    </div>
  </div>
);

export default App;
