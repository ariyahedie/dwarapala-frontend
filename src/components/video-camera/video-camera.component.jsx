import React from 'react';
import config from '../../config';

const VideoCamera = ({ companyId, mode }) => {
  return (
    <div>
      <iframe
        src={`${config.baseUrl}/${mode}/${companyId}`}
        title='cam'
        width={320}
        height={320}
        frameborder="1"
        scrolling="no"
      >
      </iframe>
    </div>
  );
};

export default VideoCamera;
