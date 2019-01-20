import React from 'react';
import { Alert } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({ newChannelRequestStatus }) => ({ newChannelRequestStatus });

@connect(mapStateToProps)
class AlertChatPanel extends React.Component {
  render() {
    const { newChannelRequestStatus } = this.props;
    const isAddChannelFailure = newChannelRequestStatus === 'failure';
    return (
      <div>
        {isAddChannelFailure && <Alert variant="danger">Error while adding new channel</Alert>}
      </div>
    );
  }
}

export default AlertChatPanel;
