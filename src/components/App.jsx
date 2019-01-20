import React from 'react';

import connect from '../connect';
import Channels from './Channels';
import Chat from './Chat';
import MsgPanel from './MsgPanel';
import AlertPanel from './AlertPanel';

const mapStateToProps = ({ msgRequestStatus, newChannelRequestStatus }) => (
  {
    msgStatus: msgRequestStatus,
    channelStatus: newChannelRequestStatus,
  });

const App = ({ msgStatus, channelStatus }) => (
  <div className="container-fluid pt-2">
    <div className="row">
      <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 pb-2">
        <Channels />
        <AlertPanel status={channelStatus}>Error while adding new channel</AlertPanel>
      </div>
      <div className="col-xl-8 col-lg-10 col-md-9 col-sm-8">
        <MsgPanel />
        <AlertPanel status={msgStatus}>Error while sending message</AlertPanel>
        <Chat />
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps)(App);
