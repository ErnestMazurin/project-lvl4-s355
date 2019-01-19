import React from 'react';
import gon from 'gon';

import Channels from './Channels';
import Chat from './Chat';
import MsgPanel from './MsgPanel';
import AlertChatPanel from './AlertChatPanel';
import AlertChannelPanel from './AlertChannelPanel';
import setAndGetUsername from '../setAndGetUsername';
import connect from '../connect';

@connect()
class App extends React.Component {
  componentDidMount() {
    const { setCurrentUsername, newMessage, newChannel } = this.props;
    const username = setAndGetUsername();
    setCurrentUsername({ username });

    const { messages, channels } = gon;

    channels.map(channel => ({ id: channel.id, attributes: channel }))
      .forEach(record => newChannel(record));

    messages.map(message => ({ id: message.id, attributes: message }))
      .forEach(record => newMessage(record));
  }

  render() {
    return (
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 pb-2">
            <Channels />
            <AlertChannelPanel />
          </div>
          <div className="col-xl-8 col-lg-10 col-md-9 col-sm-8">
            <MsgPanel />
            <AlertChatPanel />
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
