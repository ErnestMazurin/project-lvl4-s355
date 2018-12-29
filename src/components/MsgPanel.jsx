import React from 'react';
import { reduxForm, Field } from 'redux-form';

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> int,
  content -> string
}
 */

class MsgPanel extends React.Component {
  send = ({ content }) => {
    const { currentChannelId, currentUsername, reset, sendMessage } = this.props;
    sendMessage(currentChannelId, { content, username: currentUsername });
    reset();
  };

  render() {
    const { handleSubmit, msgRequestStatus } = this.props;
    const isDisable = msgRequestStatus === 'request';
    const isFailure = msgRequestStatus === 'failure';
    return (
      <div className="container mb-2">
        <form onSubmit={handleSubmit(this.send)}>
          <div className="input-group">
            <button type="submit" className="btn btn-success px-4" disabled={isDisable}>Send</button>
            <Field
              name="content"
              required
              component="input"
              type="text"
              placeholder="Enter message ..."
              className="form-control"
              autoComplete="off"
            />
          </div>
        </form>
        {isFailure ? <div className="alert alert-danger" role="alert">Send message failure</div> : null}
      </div>
    );
  }
}

export default reduxForm({
  form: 'newMessageText',
})(MsgPanel);
