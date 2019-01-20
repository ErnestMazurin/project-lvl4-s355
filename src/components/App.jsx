import React from 'react';

import connect from '../connect';
import Channels from './Channels';
import Chat from './Chat';
import MsgPanel from './MsgPanel';
import AlertPanel from './AlertPanel';

const mapStateToProps = (
  {
    newMessageRequestStatus,
    newChannelRequestStatus,
    deleteChannelRequestStatus,
    renameChannelRequestStatus,
  },
) => (
  {
    msgStatus: newMessageRequestStatus,
    newChannelStatus: newChannelRequestStatus,
    deleteChannelStatus: deleteChannelRequestStatus,
    renameChannelStatus: renameChannelRequestStatus,
  });

const App = ({ msgStatus, newChannelStatus, deleteChannelStatus, renameChannelStatus }) => (
  <div className="container-fluid pt-2">
    <div className="row">
      <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 pb-2">
        <Channels />
        <AlertPanel status={newChannelStatus}>Error while adding new channel</AlertPanel>
        <AlertPanel status={deleteChannelStatus}>Error while deleting channel</AlertPanel>
        <AlertPanel status={renameChannelStatus}>Error while renaming channel</AlertPanel>
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
