import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import AlertPanel from './AlertPanel';

const mapStateToProps = ({
  requestStatus,
  ui: {
    renameChannelModal: { show, channelId },
  },
}) => ({
  status: requestStatus,
  show,
  channelId,
});

class RenameChannelModal extends React.Component {
  handleClose = (event) => {
    event.preventDefault();
    this.close();
  };

  submit = async ({ name }) => {
    const { sendRenameChannel, channelId } = this.props;
    await sendRenameChannel(channelId, name);
    this.close();
  };

  close = () => {
    const { hideRenameChannelModal, reset } = this.props;
    reset();
    hideRenameChannelModal();
  };

  render() {
    const { handleSubmit, submitting, show, status } = this.props;
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.submit)}>
          <Modal.Body>
            <div className="input-group">
              <Field
                name="name"
                required
                component="input"
                type="text"
                placeholder="Enter new channel`s name ..."
                className="form-control"
                autoComplete="off"
              />
            </div>
            <AlertPanel requestStatus={status} type="RENAME_CHANNEL">
              Error while renaming channel
            </AlertPanel>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} disabled={submitting}>
              Close
            </Button>
            <Button type="submit" disabled={submitting}>
              Update channel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(reduxForm({ form: 'renameChannelName' })(RenameChannelModal));
