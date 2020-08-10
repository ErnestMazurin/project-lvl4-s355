import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import AlertPanel from './AlertPanel';

const mapStateToProps = ({
  ui: {
    newChannelModal: { show },
  },
  requestStatus,
}) => ({ show, status: requestStatus });

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

  submit = async ({ name }) => {
    const { sendNewChannel } = this.props;
    await sendNewChannel(name);
    this.close();
  };

  render() {
    const { handleSubmit, submitting, show, status } = this.props;

    return (
      <span>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>New channel</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(this.submit)}>
            <Modal.Body>
              <div className="input-group">
                <Field
                  name="name"
                  required
                  component="input"
                  type="text"
                  placeholder="Enter channel name ..."
                  className="form-control"
                  autoComplete="off"
                />
              </div>
              <AlertPanel requestStatus={status} type="NEW_CHANNEL">
                Error while adding new channel
              </AlertPanel>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose} disabled={submitting}>
                Close
              </Button>
              <Button type="submit" className="success" disabled={submitting}>
                Save channel
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </span>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(reduxForm({ form: 'newChannelName' })(NewChannelModal));
