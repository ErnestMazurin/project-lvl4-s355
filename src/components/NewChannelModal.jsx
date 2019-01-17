import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field } from 'redux-form';
import connect from '../connect';
import reduxForm from '../reduxForm';


@connect(({ newChannelRequestStatus, ui: { newChannelModal: { show } } }) => ({ newChannelRequestStatus, show }))
@reduxForm({ form: 'newChannelName' })
class NewChannelModal extends React.Component {
  handleClose = (event) => {
    event.preventDefault();
    this.close();
  };

  close = () => {
    const { reset, hideNewChannelModal } = this.props;
    reset();
    hideNewChannelModal();
  };

  submit = ({ name }) => {
    const { sendNewChannel } = this.props;
    this.close();
    return sendNewChannel(name);
  };

  render() {
    const { handleSubmit, submitting, show } = this.props;
    return (
      <span>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>New channel</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(this.submit)}>
            <Modal.Body>
              <div className="input-group">
                <Field name="name" required component="input" type="text" placeholder="Enter channel name ..." className="form-control" autoComplete="off" />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose} disabled={submitting}>Close</Button>
              <Button type="submit" className="success" disabled={submitting}>Save channel</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </span>
    );
  }
}

export default NewChannelModal;
