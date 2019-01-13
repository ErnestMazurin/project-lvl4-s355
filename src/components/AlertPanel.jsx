import React from 'react';
import { Alert } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({ msgRequestStatus, newChannelRequestStatus }) => ({
  msgRequestStatus,
  newChannelRequestStatus,
});

@connect(mapStateToProps)
class AlertPanel extends React.Component {

  render() {
    const { msgRequestStatus, newChannelRequestStatus } = this.props;
    const isMsgFailure = msgRequestStatus === 'failure';
    const isAddChannelFailure = newChannelRequestStatus === 'failure';
    return (
      <div>
        {isMsgFailure && <Alert variant="danger">Error while sending message</Alert>}
        {isAddChannelFailure && <Alert variant="danger">Error while adding new channel</Alert>}
      </div>
    );
  }
}

export default AlertPanel;
