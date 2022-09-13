import React from 'react';
import httpClient from '../../httpClient';
import Webcam from 'react-webcam';
import config from '../../config';
import './camera.styles.scss';

import CompletionBar from "../../components/completion-bar/completion-bar.component";
import Button from '@mui/material/Button';

class Camera extends React.Component{
  constructor() {
    super();
    this.webcamRef = React.createRef(null);
    this.state = {
      captureIndicator: '',
      picCount: 0
    }
  }

  videoConstraints = {
    width : 300,
    height : 300,
    facingMode: 'user'
  };

  capture = async () => {
    this.setState({ captureIndicator: 'green-border' });
    setTimeout(() => {
      this.setState({ captureIndicator: '' });
    }, 500);

    const imageSrc = this.webcamRef.current.getScreenshot();

    await httpClient.post(`${config.baseUrl}/upload_image`, {
      data : imageSrc,
      company_id: this.props.currentUser.company,
      email: this.props.currentUser.email
    }).catch(error => {
      console.log(`error = ${error}`);
    });
    this.getPicsCount();
  }

  getPicsCount = async () => {
    try{
      const response = await httpClient.get(`${config.baseUrl}/pic_count/${this.props.currentUser.id}`);
      this.setState({ picCount: response.data.count });
    } catch(error) {
      console.error(error);
    }
  }

  getPercentage = (value) => {
    const percentage = value*(100/config.trainingImageQty);
    return (percentage > 100) ? 100 : percentage;
  }

  updateEmbeddings = async () => {
    if(this.getPercentage(this.state.picCount) < 100) return;

    const status = await httpClient.get(`${config.baseUrl}/update_embeddings/${this.props.currentUser.company}`);
    console.log(status);
  }

  componentDidMount() {
    this.getPicsCount();
  }

  componentDidUpdate() {
    this.updateEmbeddings();
  }
  
  render() {
    const { captureIndicator, picCount } = this.state;
    return (
      <div className='webcam-wrapper'>
        <Webcam
          className={`webcam ${captureIndicator}`}
          audio={false}
          height={300}
          width={300}
          ref={this.webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={this.videoConstraints}
        />
        <Button
          sx={{my: 2, display: "block"}}
          onClick={this.capture}
          variant="contained"
          color="success"
        >
          Capture
        </Button>
        <CompletionBar percentage={this.getPercentage(picCount)} />
      </div>
    );
  }
};

export default Camera;