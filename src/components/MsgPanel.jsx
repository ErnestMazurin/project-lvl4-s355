import React from 'react';
import { Field } from 'redux-form';
import connect from '../connect';
import reduxForm from '../reduxForm';

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> int,
  content -> string
}
 */

const mapStateToProps = ({ currentChannelId, currentUsername }) => ({ currentChannelId, currentUsername });

@connect(mapStateToProps)
@reduxForm({ form: 'newMessageText' })
class MsgPanel extends React.Component {
  send = ({ content }) => {
    const { currentChannelId, currentUsername } = this.props;
    const { reset, sendNewMessage } = this.props;
    reset();
    return sendNewMessage(currentChannelId, { content, username: currentUsername });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid mb-2 px-0 shadow">
        <form onSubmit={handleSubmit(this.send)}>
          <div className="input-group">
            <button type="submit" className="btn btn-success px-4" disabled={submitting}>Send</button>
            <Field name="content" required component="input" type="text" placeholder="Enter message ..." className="form-control" autoComplete="off" />
          </div>
        </form>
      </div>
    );
  }
}

export default MsgPanel;
