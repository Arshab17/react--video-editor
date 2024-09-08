import React from 'react';
import VideoEditor from './VideoEditor';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
const Dashboard = () => {
  const videoUrls = [video1, video2]; // Replace with your video URL

  return (
    <div>
      <h1>Video Editor</h1>
      <VideoEditor videoUrls={videoUrls} />
    </div>
  );
};

export default Dashboard;
