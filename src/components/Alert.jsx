import React from 'react';
import { ExclamationTriangle } from 'react-bootstrap-icons';

const Alert = () => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <ExclamationTriangle className="me-2" />
            <div>
                An example danger alert with an icon
            </div>
        </div>
    );
}

export default Alert;