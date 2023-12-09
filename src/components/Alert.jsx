import React from 'react';
import { ExclamationTriangle } from 'react-bootstrap-icons';

const Alert = ({ msg }) => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <ExclamationTriangle className="me-2" />
            <div>{msg}</div>
        </div>
    );
}

export default Alert;