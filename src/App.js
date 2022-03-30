import styled from "styled-components";
import "./App.css";
import Draggable from "./Component/Draggable.component";
import VideoElement from "./Component/VideoElement.component";

function App() {
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
