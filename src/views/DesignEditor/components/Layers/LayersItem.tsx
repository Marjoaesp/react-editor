import React from "react"
import useAppContext from "~/hooks/useAppContext"
import LayerItem from "../Panels/panelItems/Layers"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"
import { Block } from "baseui/block"

interface State {
  panel: string
}
function LayersList() {
  const Component = LayerItem

  return (
    <Block
      id="EditorLayerItem"
      $style={{
        background: "#ffffff",
        width: "250px",
        flex: "none",
        borderRight: "1px solid #d7d8e3",
        display: "flex",
        transition: "ease width 0.1s",
        overflow: "hidden",
      }}
    >
      {Component && <Component />}
    </Block>
  )
}

export default LayersList
