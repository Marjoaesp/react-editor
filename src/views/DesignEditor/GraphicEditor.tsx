import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Layers from "./components/Layers"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import Sidebar from "./components/SidebarMartin"
import EditorContainer from "./components/EditorContainer"

function GraphicEditor() {
  return (
    <>
    
      <EditorContainer>
        <Navbar />
        <div style={{ display: "flex", flex: 1 }}>
          <Panels />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Toolbox />
            <Canvas />
            <Footer />
          </div>
          <Layers />
        </div>
      </EditorContainer>
    </>
  )
}

export default GraphicEditor
