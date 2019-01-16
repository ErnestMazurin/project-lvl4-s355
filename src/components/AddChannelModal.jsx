import React from 'react';
import { Button, Modal, Badge } from 'react-bootstrap';
import { Field } from 'redux-form';
import connect from '../connect';
import reduxForm from '../reduxForm';


@connect(({ newChannelRequestStatus }) => ({ newChannelRequestStatus }))
@reduxForm({ form: 'newChannelName' })
class AddChannelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  handleShow = (event) => {
    event.preventDefault();
    this.setState({ show: true });
  };

  handleClose = (event) => {
    event.preventDefault();
    this.close();
  };

  close = () => {
    const { reset } = this.props;
    this.setState({ show: false });
    reset();
  };

  submit = ({ name }) => {
    const { sendNewChannel } = this.props;
    this.close();
    return sendNewChannel(name);
  };

  render() {
    const { show } = this.state;
    const { handleSubmit, submitting } = this.props;
    return (
      <span>
        <Badge variant="success" className="ml-1" onClick={this.handleShow}>New</Badge>
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

export default AddChannelModal;
