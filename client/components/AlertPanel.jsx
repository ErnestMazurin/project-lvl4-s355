import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default ({ requestStatus: { status, windowType }, type, children }) =>
  windowType === type && status === 'failure' && <Alert variant="danger">{children}</Alert>;
