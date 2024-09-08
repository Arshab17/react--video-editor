import React, { useState, useRef, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Timeline from './TimeLine';

const VideoEditor = ({ videoUrls }) => {
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoDurations, setVideoDurations] = useState([]);
  const [totalElapsed, setTotalElapsed] = useState(0);

  useEffect(() => {
    const durations = [];
    videoUrls.forEach((url, index) => {
      const videoElement = document.createElement('video');
      videoElement.src = url;
      videoElement.onloadedmetadata = () => {
        durations[index] = videoElement.duration;
        if (durations.length === videoUrls.length) {
          setVideoDurations(durations);
        }
      };
    });
  }, [videoUrls]);

  const handleProgress = (state) => {
    const currentVideoPlayed = state.playedSeconds;
    let elapsed = currentVideoPlayed;

    // Calculate the total time elapsed considering previous videos
    for (let i = 0; i < currentVideoIndex; i++) {
      elapsed += videoDurations[i];
    }

    setPlayed(currentVideoPlayed);
    setTotalElapsed(elapsed);
  };

  const handleSeek = (seekTime) => {
    playerRef.current.seekTo(seekTime, 'seconds');
  };

  const handleVideoSelect = (videoUrl) => {
    const index = videoUrls.indexOf(videoUrl);
    setCurrentVideoIndex(index);
    playerRef.current.seekTo(0);
    setPlayed(0);
  };

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      playerRef.current.seekTo(0);
      setPlayed(0);
    }
  };

  return (
    <div className="video-editor">
      <VideoPlayer
        url={videoUrls[currentVideoIndex]}
        onProgress={handleProgress}
        onDuration={setPlayed}
        onEnded={handleVideoEnd}
        playerRef={playerRef}
      />
      <Timeline
        playerRef={playerRef}
        playedSeconds={totalElapsed}
        onSeek={handleSeek}
        videoUrls={videoUrls}
        videoDurations={videoDurations}
        onVideoSelect={handleVideoSelect}
      />
    </div>
  );
};

export default VideoEditor;
