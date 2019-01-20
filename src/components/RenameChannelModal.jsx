import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field } from 'redux-form';
import connect from '../connect';
import reduxForm from '../reduxForm';


const mapStateToProps = (
  {
    ui: {
      renameChannelModal: {
        show,
        channelId,
      },
    },
  },
) => ({
  show,
  channelId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannelName' })
class RenameChannelModal extends React.Component {
  handleClose = (event) => {
    event.preventDefault();
    this.close();
  };

  submit = ({ name }) => {
    const { sendRenameChannel, channelId } = this.props;
    this.close();
    return sendRenameChannel(channelId, name);
  };

  close = () => {
    const { hideRenameChannelModal, reset } = this.props;
    reset();
    hideRenameChannelModal();
  };

  render() {
    const { handleSubmit, submitting, show } = this.props;
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.submit)}>
          <Modal.Body>
            <div className="input-group">
              <Field name="name" required component="input" type="text" placeholder="Enter new channel`s name ..." className="form-control" autoComplete="off" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} disabled={submitting}>Close</Button>
            <Button type="submit" disabled={submitting}>Update channel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default RenameChannelModal;
