import React, { useEffect, useRef, useState } from 'react';
import { detectAllFaces, matchDimensions, resizeResults } from 'face-api.js';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';


const FaceRecognition = ({ isRunning }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        console.log('Models loaded successfully');
        setIsModelLoaded(true);
      } catch (error) {
        console.error('Error loading face-api.js models', error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    const runFaceRecognition = async () => {
      if (!webcamRef.current || !canvasRef.current || !isModelLoaded || !isRunning) return;

      const video = webcamRef.current.video;
      const displaySize = { width: video.width, height: video.height };
      matchDimensions(canvasRef.current, displaySize);

      const detections = await detectAllFaces(video).withFaceLandmarks().run();

      if (detections.length > 0) {
        console.log('Face detected!');
      } else {
        console.log('No face detected.');
      }

      const resizedDetections = resizeResults(detections, displaySize);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height);
      resizedDetections.forEach((detection) => {
        const { box } = detection;
        const drawBox = new Path2D();
        drawBox.rect(box.x, box.y, box.width, box.height);
        context.strokeStyle = 'blue';
        context.lineWidth = 2;
        context.stroke(drawBox);
      });
    };

    const recognitionInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
    const intervalId = setInterval(runFaceRecognition, recognitionInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, isModelLoaded]);

  return (
    <div>
      {isModelLoaded && (
        <>
          <Webcam
            ref={webcamRef}
            width={640}
            height={480}
            style={{ width: '20%' }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </>
      )}
    </div>
  );
};

export default FaceRecognition;
