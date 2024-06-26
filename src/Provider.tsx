import React from "react"  // Importa React, la biblioteca principal para construir interfaces de usuario
import { Provider as ScenifyProvider } from "@layerhub-io/react"  // Importa el proveedor de Scenify de la biblioteca @layerhub-io/react
import { Client as Styletron } from "styletron-engine-atomic"  // Importa el cliente de Styletron para el motor de estilos
import { Provider as StyletronProvider } from "styletron-react"  // Importa el proveedor de Styletron para usarlo en React
import { BaseProvider, LightTheme } from "baseui"  // Importa BaseProvider y un tema ligero de la biblioteca baseui
import { store } from "./store/store"  // Importa el store de Redux desde la ruta especificada
import { Provider } from "react-redux"  // Importa el proveedor de React-Redux
import { AppProvider } from "./contexts/AppContext"  // Importa el proveedor de contexto de la aplicación
import { DesignEditorProvider } from "./contexts/DesignEditor"  // Importa el proveedor de contexto del editor de diseño
import { I18nextProvider } from "react-i18next"  // Importa el proveedor de i18next para la internacionalización
import { TimerProvider } from "@layerhub-io/use-timer"  // Importa el proveedor de Timer de la biblioteca @layerhub-io/use-timer
import i18next from "i18next"  // Importa la instancia de i18next para la internacionalización
import "./translations"  // Importa las traducciones configuradas

// Crea una instancia del motor de Styletron
const engine = new Styletron()

// Define un componente funcional que recibe a sus hijos como props
export default function ({ children }: { children: React.ReactNode }) {
  return (
    // Proveedor de Redux que permite acceder al store en toda la aplicación
    <Provider store={store}>  
      {/* Proveedor de contexto para el editor de diseño */}
      <DesignEditorProvider>
        {/* Proveedor de contexto para el temporizador */}
        <TimerProvider>
          {/* Proveedor de contexto para la aplicación */}
          <AppProvider>
            {/* Proveedor de contexto específico de Scenify */}
            <ScenifyProvider>
              {/* Proveedor de Styletron para el motor de estilos */}
              <StyletronProvider value={engine}>
                {/* Proveedor de Base UI con un tema ligero */}
                <BaseProvider theme={LightTheme}>
                  {/* Proveedor de i18next para la internacionalización */}
                  <I18nextProvider i18n={i18next}>
                    {/* Renderiza los hijos del componente */}
                    {children}
                  </I18nextProvider>
                </BaseProvider>
              </StyletronProvider>
            </ScenifyProvider>
          </AppProvider>
        </TimerProvider>
      </DesignEditorProvider>
    </Provider>
  )
}
