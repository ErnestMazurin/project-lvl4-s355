import React from 'react';
import gon from 'gon';

import Channels from './Channels';
import Chat from './Chat';
import MsgPanel from './MsgPanel';
import AlertPanel from './AlertPanel';
import setAndGetUsername from '../setAndGetUsername';
import connect from '../connect';

@connect()
class App extends React.Component {
  componentWillMount() {
    const { setCurrentUsername, addMessage, addChannel } = this.props;
    const username = setAndGetUsername();
    setCurrentUsername({ username });

    const { messages, channels } = gon;

    channels.map(channel => ({ attributes: channel }))
      .forEach(rec => addChannel(rec));

    messages.map(msg => ({ id: msg.id, attributes: msg }))
      .forEach(rec => addMessage(rec));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Channels />
          </div>
          <div className="col-10">
            <MsgPanel />
            <AlertPanel />
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
