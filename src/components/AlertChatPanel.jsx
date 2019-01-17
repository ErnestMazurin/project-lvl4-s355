import React from 'react';
import { Alert } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({ msgRequestStatus }) => ({ msgRequestStatus });

@connect(mapStateToProps)
class AlertChatPanel extends React.Component {

  render() {
    const { msgRequestStatus } = this.props;
    const isMsgFailure = msgRequestStatus === 'failure';
    return (
      <div>
        {isMsgFailure && <Alert variant="danger">Error while sending message</Alert>}
      </div>
    );
  }
}

export default AlertChatPanel;
