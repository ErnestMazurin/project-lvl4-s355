import React from 'react';
import { Button, Modal } from 'react-bootstrap';
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
    this.setState({ show: false });
  };

  submit = ({ name }) => {
    const { sendNewChannel, reset } = this.props;
    return sendNewChannel(name).then(() => {
      reset();
      this.close();
    });
  };

  render() {
    const { show } = this.state;
    const { handleSubmit, submitting, newChannelRequestStatus } = this.props;
    return (
      <span>
        <a className="badge badge-secondary ml-1" onClick={this.handleShow} href="">New</a>
        <Modal show={show}>
          <form onSubmit={handleSubmit(this.submit)}>
            <Modal.Header><Modal.Title>New channel</Modal.Title></Modal.Header>
            <Modal.Body>
              <div className="input-group">
                <Field name="name" required component="input" type="text" placeholder="Enter channel name ..." className="form-control" autoComplete="off" />
              </div>
              {newChannelRequestStatus === 'failure' ? <div className="alert alert-danger">Network error</div> : null}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose} disabled={submitting}>Close</Button>
              <Button type="submit" className="primary" disabled={submitting}>Save channel</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </span>
    );
  }
}

export default AddChannelModal;
