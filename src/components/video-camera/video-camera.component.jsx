import React from 'react';
import config from '../../config';

class VideoCamera extends React.Component {
  render() {
    return (
      <div>
        <iframe
          id='myframe'
          src={`${config.baseUrl}/video_feed/${this.props.companyId}`}
          title='cam'
          width={320}
          height={320}
          frameBorder="1"
          scrolling="no"
        >
        </iframe>
      </div>
    );
  }
};

export default VideoCamera;
