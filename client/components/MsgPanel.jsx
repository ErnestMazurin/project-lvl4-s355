import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import UsernameContext from '../UsernameContext';
import AlertPanel from './AlertPanel';

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> int,
  content -> string
}
 */

const mapStateToProps = ({ ui: { currentChannelId }, requestStatus }) => ({ currentChannelId, status: requestStatus });

class MsgPanel extends React.Component {
  send = (username) => async ({ content }) => {
    const { currentChannelId, reset, sendNewMessage } = this.props;
    await sendNewMessage({ content, username, channelId: currentChannelId });
    reset();
  };

  render() {
    const { handleSubmit, submitting, status } = this.props;
    return (
      <UsernameContext.Consumer>
        {(username) => (
          <div className="container-fluid mb-2 px-0 shadow">
            <form onSubmit={handleSubmit(this.send(username))}>
              <div className="input-group">
                <button type="submit" className="btn btn-success px-4" disabled={submitting}>
                  Send
                </button>
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
            <AlertPanel requestStatus={status} type="NEW_MESSAGE">
              Error while sending message
            </AlertPanel>
          </div>
        )}
      </UsernameContext.Consumer>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(reduxForm({ form: 'newMessageText' })(MsgPanel));
