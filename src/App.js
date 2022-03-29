import styled from "styled-components";
import "./App.css";
import Draggable from "./Component/Draggable.component";
import VideoElement from "./Component/VideoElement.component";

function App() {
  const isMobile =
    Math.min(window.screen.width, window.screen.height) < 768 ||
    navigator.userAgent.indexOf("Mobi") > -1;

  return (
    <Container id="container">
      <Draggable>
        <VideoElement />
      </Draggable>
      <div id="div1"></div>
      <div id="div2"></div>
      <div id="div3"></div>
      <div id="div4"></div>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: fixed;
  z-index: 0;
  width: 100vw;
  height: 100vh;
`;
