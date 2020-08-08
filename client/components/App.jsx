import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import MsgPanel from './MsgPanel';

export default () => (
  <div className="container-fluid pt-2">
    <div className="row">
      <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 pb-2">
        <Channels />
      </div>
      <div className="col-xl-8 col-lg-10 col-md-9 col-sm-8">
        <MsgPanel />
        <Chat />
      </div>
    </div>
  </div>
);
