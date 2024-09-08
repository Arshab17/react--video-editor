import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, onProgress, onDuration, playerRef, onEnded }) => {
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={true}
        onProgress={onProgress}
        onDuration={onDuration}
        onEnded={onEnded}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default VideoPlayer;
