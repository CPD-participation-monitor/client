import React, { useState, useEffect } from 'react';
import FaceRecognition from './FaceRecognition'; // Import the FaceRecognition component

const UserDashboard = () => {
    const [isFaceRecognitionRunning, setIsFaceRecognitionRunning] = useState(false);

    // Function to start or stop face recognition
    const toggleFaceRecognition = () => {
        setIsFaceRecognitionRunning(!isFaceRecognitionRunning);
    };

    // Start face recognition when the component mounts
    useEffect(() => {
        if (isFaceRecognitionRunning) {
            // Start face recognition here (you can call a function to start the recognition)
        } else {
            // Stop face recognition here (you can call a function to stop the recognition)
        }
    }, [isFaceRecognitionRunning]);

    return (
        <div>
            <div>UserDashboard</div>
            {isFaceRecognitionRunning && <FaceRecognition />} {/* Render FaceRecognition component when running */}
            <button onClick={toggleFaceRecognition} style={{ marginTop: '100px' }}>
                {isFaceRecognitionRunning ? "Stop Face Recognition" : "Start Face Recognition"}
            </button>
        </div>
    );
}

export default UserDashboard;
