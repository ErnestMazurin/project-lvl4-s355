import React from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';
import AlertPanel from './AlertPanel';

const mapStateToProps = (
  {
    requestStatus,
    ui: {
      deleteChannelModal: {
        show,
        channelName,
        channelId,
      },
    },
  },
) => ({
  status: requestStatus,
  show,
  channelName,
  channelId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'confirmChannelName' })
class DeleteChannelModal extends React.Component {
  handleClose = (event) => {
    event.preventDefault();
    this.close();
  };

  submit = async ({ name }) => {
    const { channelName, channelId, sendDeleteChannel } = this.props;

    if (name !== channelName) {
      throw new SubmissionError({ _error: 'validation error' });
    }

    await sendDeleteChannel(channelId);
    this.close();
  };

  close = () => {
    const { hideDeleteChannelModal, reset } = this.props;
    reset();
    hideDeleteChannelModal();
  };

  render() {
    const {
      handleSubmit,
      submitting,
      show,
      status,
      error
    } = this.props;
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Confirm channel deleting</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.submit)}>
          <Modal.Body>
            <div className="input-group">
              <p className="text-danger">
                You trying to delete chat channel and all messages in it. Please type in the name of the channel to
                confirm.
              </p>
              <Field name="name" required component="input" type="text" placeholder="Enter channel name ..." className="form-control" autoComplete="off" />
            </div>
            {error && <Alert variant="warning">Wrong channel name</Alert>}
            <AlertPanel requestStatus={status} type="DELETE_CHANNEL">Error while deleting channel</AlertPanel>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} disabled={submitting}>Close</Button>
            <Button type="submit" disabled={submitting}>Delete channel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default DeleteChannelModal;
