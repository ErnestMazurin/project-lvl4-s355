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
    const { reset, sendMessage } = this.props;
    reset();
    return sendMessage(currentChannelId, { content, username: currentUsername });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container mb-2">
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
