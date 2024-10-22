import Graphic from "./Graphic"
import Presentation from "./Presentation"
import Video from "./Video"
import useEditorType from "~/hooks/useEditorType"

export default function () {
  const editorType = useEditorType()

  if (editorType === "NONE") {
    return <></>
  } else {
    return <Graphic />
  }
}
