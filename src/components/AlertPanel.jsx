import React from 'react';
import { Alert } from 'react-bootstrap';

export default ({ status, children }) => status === 'failure' && <Alert variant="danger">{children}</Alert>;
