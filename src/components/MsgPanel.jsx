import React from 'react';
import { reduxForm, Field } from 'redux-form';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> string,
  content -> string
}
 */

class MsgPanel extends React.Component {
  send = ({ content }) => {
    const { currentChannelId, username, addMessage, reset } = this.props;
    addMessage({
      message: {
        channelId: currentChannelId,
        author: username,
        content,
      },
    });
    reset();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container mb-2">
        <form onSubmit={handleSubmit(this.send)}>
          <div className="input-group">
            <button type="submit" className="btn btn-success px-4">Send</button>
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
      </div>
    );
  }
}

export default reduxForm({
  form: 'newMessageText',
})(MsgPanel);
