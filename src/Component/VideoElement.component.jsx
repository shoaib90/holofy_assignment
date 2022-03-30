import React, { Component } from "react";
import styled from "styled-components";

export class VideoElement extends Component {
  render() {
    return (
      <VideoContainer id="dragElement">
        <video
          id="myVideo"
          controls
          autoPlay={false}
          onClick={this.props.handleVideoPlayer}
          src="https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4"
        />
      </VideoContainer>
    );
  }
}

export default VideoElement;

const VideoContainer = styled.div`
  video {
    width: 200px;
    height: 300px;
    object-fit: fill;
    position: absolute;
  }
`;
