import { BrowserRouter, Routes, Route } from "react-router-dom"  // Importa componentes para el enrutamiento en React
import DesignEditor from "~/views/DesignEditor"  // Importa el componente DesignEditor desde la ruta especificada
import Login from "~/views/Login"  // Importa el componente Dashboard desde la ruta especificada
import Register from "./views/Register"
import Screens from "./views/Screen"
// Define un componente funcional llamado Router
function Router() {
  return (
    // Envuelve la aplicación con el BrowserRouter para habilitar la funcionalidad de enrutamiento
    
    <BrowserRouter>
      {/* Define las rutas de la aplicación */}
      <Routes>
        {/* Define una ruta que muestra el componente Dashboard cuando la URL es "/manage" */}
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Screens" element={<Screens/>} />

        
        {/* Define la ruta raíz que muestra el componente DesignEditor cuando la URL es "/" */}
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router  // Exporta el componente Router como el valor predeterminado del módulo
