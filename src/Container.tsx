import React, { useEffect, useRef, useState } from "react"  // Importa React y algunos hooks
import ResizeObserver from "resize-observer-polyfill"  // Importa el polyfill para ResizeObserver, que observa cambios de tamaño en elementos
import useAppContext from "~/hooks/useAppContext"  // Importa un hook personalizado para el contexto de la aplicación
import Loading from "./components/Loading"  // Importa un componente de carga
import { editorFonts } from "./constants/fonts"  // Importa la lista de fuentes del editor
import { getFonts } from "./store/slices/fonts/actions"  // Importa la acción para obtener fuentes
import { getUploads } from "./store/slices/uploads/actions"  // Importa la acción para obtener subidas
import { useAppDispatch } from "./store/store"  // Importa el hook personalizado para el despacho de acciones

function Container({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)  // Crea una referencia al contenedor div
  const { isMobile, setIsMobile } = useAppContext()  // Obtiene y establece el estado de la aplicación desde el contexto
  const [loaded, setLoaded] = useState(false)  // Estado local para rastrear si se han cargado los recursos
  const dispatch = useAppDispatch()  // Hook para despachar acciones

  // Función para actualizar la consulta de medios según el ancho del contenedor
  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false)
    } else if (!isMobile && value < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // Hook useEffect que se ejecuta al montar el componente y configura el ResizeObserver
  useEffect(() => {
    const containerElement = containerRef.current!
    const containerWidth = containerElement.clientWidth
    updateMediaQuery(containerWidth)
    
    const resizeObserver = new ResizeObserver((entries) => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {}
      updateMediaQuery(width)
    })

    resizeObserver.observe(containerElement)

    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hook useEffect que se ejecuta al montar el componente y despacha varias acciones
  useEffect(() => {
    dispatch(getFonts())
    dispatch(getUploads())
    loadFonts()
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [dispatch])

  // Función para cargar las fuentes
  const loadFonts = () => {
    const promisesList = editorFonts.map((font) => {
      //@ts-ignore
      return new FontFace(font.name, `url(${font.url})`, font.options).load().catch((err) => err)
    })
    
    Promise.all(promisesList)
      .then((res) => {
        res.forEach((uniqueFont) => {
          if (uniqueFont && uniqueFont.family) {
            document.fonts.add(uniqueFont)
          }
        })
      })
      .catch((err) => console.log({ err }))
  }

  // Renderiza el contenedor
  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      {loaded ? <>{children}</> : <Loading />}
    </div>
  )
}

export default Container  // Exporta el componente Container como el valor predeterminado del módulo
