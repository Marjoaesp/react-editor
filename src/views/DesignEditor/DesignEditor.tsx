import useEditorType from "~/hooks/useEditorType"  // Importa un hook personalizado para obtener el tipo de editor actual
import SelectEditor from "./SelectEditor"  // Importa el componente SelectEditor
import GraphicEditor from "./GraphicEditor"  // Importa el componente GraphicEditor
import useDesignEditorContext from "~/hooks/useDesignEditorContext"  // Importa un hook personalizado para el contexto del editor de diseño
import Preview from "./components/Preview"  // Importa el componente Preview
import Sidebar from "./components/SidebarMartin"
function DesignEditor() {
  // Usa el hook personalizado para obtener el tipo de editor
  const editorType = useEditorType()
  // Usa el hook personalizado para obtener y establecer el estado de visualización del preview
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>
      {/* Renderiza el componente Preview si displayPreview es true */}
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      <Sidebar/>

      {/* Renderiza el editor correspondiente basado en el tipo de editor */}
      {
        {

          NONE: <SelectEditor />,  // Renderiza SelectEditor si el tipo de editor es NONE
          GRAPHIC: <GraphicEditor />,  // Renderiza GraphicEditor si el tipo de editor es GRAPHIC
        }[editorType]
      }
    </>
  )
}

export default DesignEditor  // Exporta el componente DesignEditor como el valor predeterminado del módulo
