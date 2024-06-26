// Desactiva la verificación de TypeScript en este archivo.
// @ts-nocheck

// Importaciones necesarias
import React from "react" // Importa React para construir el componente.
import { LightTheme, ThemeProvider } from "baseui" // Importa el tema claro y el proveedor de temas de Baseweb.
import { Drawer, SIZE } from "baseui/drawer" // Importa el componente Drawer y las constantes de tamaño de Baseweb.
import { Button, KIND } from "baseui/button" // Importa el componente Button y los tipos de botones de Baseweb.
import { useSelector } from "react-redux" // Importa useSelector para acceder al estado global de Redux.
import { selectPages } from "./store/slices/design-editor/selectors" // Importa el selector de páginas desde la tienda Redux.
import { nanoid } from "nanoid" // Importa nanoid para generar identificadores únicos.
import { useAppDispatch } from "./store/store" // Importa useAppDispatch para despachar acciones a Redux.
import { addPage } from "./store/slices/design-editor/actions" // Importa la acción addPage desde Redux.

export default function Pages() {
  // Estado local para manejar la visibilidad del Drawer.
  const [isOpen, setIsOpen] = React.useState(false)

  // Selector de Redux para obtener la lista de páginas.
  const pages = useSelector(selectPages)

  // Despachador de acciones de Redux.
  const dispach = useAppDispatch()

  // Función para manejar la adición de una nueva página.
  const handleAddPage = () => {
    // Despacha una acción para añadir una nueva página con un id único y un nombre predeterminado.
    dispach(
      addPage({
        id: nanoid(),
        name: "New page",
      })
    )
  }

  return (
    // Proveedor de temas para aplicar el tema claro de Baseweb.
    <ThemeProvider theme={LightTheme}>
      {/* Botón para abrir el Drawer */}
      <Button
        onClick={() => setIsOpen(true)} // Abre el Drawer cuando se hace clic en el botón.
        kind={KIND.secondary} // Tipo de botón secundario.
        $style={{
          position: "absolute", // Posición absoluta para colocar el botón en la esquina inferior derecha.
          bottom: "20px",
          right: "20px",
          zIndex: 1, // Asegura que el botón esté sobre otros elementos.
          display: isOpen ? "none" : "block", // Oculta el botón cuando el Drawer está abierto.
        }}
      >
        Pages
      </Button>

      {/* Drawer que contiene la lista de páginas y el botón para añadir nuevas páginas */}
      <Drawer size={SIZE.auto} isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column", // Alineación en columna.
            justifyContent: "space-between", // Distribuye el espacio entre los elementos.
          }}
        >
          {/* Contenedor de las páginas */}
          <div style={{ display: "grid", gap: "1rem", padding: "1rem 0" }}>
            {pages.map((page, index) => {
              return (
                // Representación de cada página.
                <div
                  style={{
                    width: "180px",
                    height: "60px",
                    border: "1px solid gray", // Borde gris alrededor de cada página.
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // Centra el contenido dentro de la página.
                  }}
                  key={page.id} // Clave única para cada elemento en la lista.
                >
                  Page {index} {/* Muestra el índice de la página */}
                </div>
              )
            })}
          </div>

          {/* Botón para añadir una nueva página */}
          <Button onClick={handleAddPage}>Add Page</Button>
        </div>
      </Drawer>
    </ThemeProvider>
  )
}
