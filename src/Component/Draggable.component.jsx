import React from "react";
import styled, { css } from "styled-components";
import "../App.css";

export default class Draggable extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0,

    divWidth: null,
    divHeight: null,
    paused: true,
  };

  componentDidMount() {
    this.setState({
      divWidth: document.getElementById("div1").offsetWidth,
      divHeight: document.getElementById("div1").offsetHeight,
      translateY: 0 + document.getElementById("container").offsetHeight - 300,
      lastTranslateY:
        0 + document.getElementById("container").offsetHeight - 300,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("touchmove", this.handleMouseMove);
    window.removeEventListener("touchend", this.handleMouseUp);
  }

  handleTouchStart = (evt) => {
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleTouchEnd);
    let location = {
      clientX: evt.touches[0].clientX,
      clientY: evt.touches[0].clientY,
    };
    this.handleMouseDown(location);
  };

  handleTouchMove = (evt) => {
    let location = {
      clientX: evt.touches[0].clientX,
      clientY: evt.touches[0].clientY,
    };
    this.handleMouseMove(location);
  };

  handleTouchEnd = () => {
    this.handleMouseUp();
  };

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    const videoElement = document.getElementById("myVideo");

    this.setState(
      {
        originalX: clientX,
        originalY: clientY,
        isDragging: true,
      },
      () => {
        videoElement.pause();
      }
    );
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    // parentNode is our bounding box
    // the minimum boundary is based on the top left corner of our container
    var minBoundX = document.getElementById("container").offsetLeft;
    var minBoundY = document.getElementById("container").offsetTop;

    // the maximum is the bottom right corner of the container
    // or the top left (x,y) + the height and width (h,y) - the size of the video
    var maxBoundX =
      minBoundX + document.getElementById("container").offsetWidth - 200;
    var maxBoundY =
      minBoundY + document.getElementById("container").offsetHeight - 300;

    if (!isDragging) {
      document
        .getElementById("dragContainerId")
        .classList.remove("horizTranslate");
      return;
    }

    this.setState((prevState) => {
      return {
        translateX: Math.abs(
          Math.max(
            minBoundX,
            Math.min(
              clientX - prevState.originalX + prevState.lastTranslateX,
              maxBoundX
            )
          )
        ),
        translateY: Math.abs(
          Math.max(
            minBoundY,
            Math.min(
              clientY - prevState.originalY + prevState.lastTranslateY,
              maxBoundY
            )
          )
        ),
      };
    });
  };

  onDragEnd = () => {
    var minBoundX = document.getElementById("container").offsetLeft;
    var minBoundY = document.getElementById("container").offsetTop;

    var maxBoundX =
      minBoundX + document.getElementById("container").offsetWidth - 200;
    var maxBoundY =
      minBoundY + document.getElementById("container").offsetHeight - 300;

    //Here in all the conditions, taken 10 px less than the half of width and height of the video element
    // so that whenever it crosses more than half of any quadrant it gets shifted to that quadrant corner

    if (
      this.state.translateX <= this.state.divWidth - 90 &&
      this.state.translateY <= this.state.divHeight - 140
    ) {
      this.setState(
        {
          translateX: 0,
          translateY: 0,
          originalX: 0,
          originalY: 0,
          lastTranslateX: 0,
          lastTranslateY: 0,
        },
        () => {
          document
            .getElementById("dragContainerId")
            .classList.add("horizTranslate");
        }
      );
    } else if (
      this.state.translateX <= 2 * this.state.divWidth - 200 &&
      this.state.translateY <= this.state.divHeight - 140
    ) {
      this.setState(
        {
          translateX: maxBoundX,
          translateY: 0,
          originalX: 0,
          originalY: 0,
          lastTranslateX: maxBoundX,
          lastTranslateY: 0,
        },
        () => {
          document
            .getElementById("dragContainerId")
            .classList.add("horizTranslate");
        }
      );
    } else if (
      this.state.translateX <= this.state.divWidth - 90 &&
      this.state.translateY <= 2 * this.state.divHeight - 140
    ) {
      this.setState(
        {
          translateX: 0,
          translateY: maxBoundY,
          originalX: 0,
          originalY: 0,
          lastTranslateX: 0,
          lastTranslateY: maxBoundY,
        },
        () => {
          document
            .getElementById("dragContainerId")
            .classList.add("horizTranslate");
        }
      );
    } else if (
      this.state.translateX <= 2 * this.state.divWidth - 90 &&
      this.state.translateY <= 2 * this.state.divHeight - 300
    ) {
      this.setState(
        {
          translateX: maxBoundX,
          translateY: maxBoundY,
          originalX: 0,
          originalY: 0,
          lastTranslateX: maxBoundX,
          lastTranslateY: maxBoundY,
        },
        () => {
          document
            .getElementById("dragContainerId")
            .classList.add("horizTranslate");
        }
      );
    }
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("touchmove", this.handleMouseMove);
    window.removeEventListener("touchend", this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false,
      },
      () => {
        if (!this.state.isDragging) {
          this.onDragEnd();
        }
      }
    );
  };

  handleVideoPlayer = () => {
    const videoElement = document.getElementById("myVideo");
    this.setState(
      {
        paused: !this.state.paused,
      },
      () => {
        if (this.state.paused) videoElement.play();
        else videoElement.pause();
      }
    );
  };

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;

    return (
      <DragContainer
        id={"dragContainerId"}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
      >
        {/* {children} */}
        {React.cloneElement(children, {
          handleVideoPlayer: this.handleVideoPlayer,
        })}
      </DragContainer>
    );
  }
}

const DragContainer = styled.div.attrs((props) => ({
  style: { transform: `translate(${props.x}px, ${props.y}px)` },
}))`
  cursor: grab;
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`;
