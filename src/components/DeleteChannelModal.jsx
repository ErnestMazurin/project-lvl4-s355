import React from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Field } from 'redux-form';
import connect from '../connect';
import reduxForm from '../reduxForm';

const mapStateToProps = ({ ui: { deleteModal: { show, channelName, channelId, isInputValid } } }) => ({ show, channelName, channelId, isInputValid });

@connect(mapStateToProps)
@reduxForm({ form: 'confirmChannelName' })
class DeleteChannelModal extends React.Component {
  handleClose = (event) => {
    event.preventDefault();
    this.close();
  };

  submit = ({ name }) => {
    const { channelName, channelId } = this.props;
    const { sendDeleteChannel, validateDeleteChannelModal } = this.props;
    const { payload: { isInputValid } } = validateDeleteChannelModal({ channelName, input: name });
    if (isInputValid) {
      this.close();
      return sendDeleteChannel(channelId);
    }
    return null;
  };

  close = () => {
    const { hideDeleteChannelModal, reset } = this.props;
    reset();
    hideDeleteChannelModal();
  };

  render() {
    const { handleSubmit, submitting, show, isInputValid } = this.props;
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
            {!isInputValid && <Alert variant="warning">Wrong channel name</Alert>}
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

/** channel = {
  id -> int,
  name -> string,
  removable -> boolean,
}
 */



export default DeleteChannelModal;
