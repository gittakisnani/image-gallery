import { useState, useEffect } from "react";
import { WindowSize } from "../types/types";


const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof document !== "undefined" ? document.body.clientWidth : undefined,
    height: typeof document !== "undefined" ? document.body.clientHeight : undefined
  })

  useEffect(() => {
    const handleResize = () => {
        if(typeof document !== 'undefined') {
            setWindowSize({
                width: document.body.clientWidth,
                height: document.body.clientHeight
            })
        }
    }

    handleResize()

    typeof window !== "undefined" && window.addEventListener('resize', handleResize);

    return () => {
      typeof window !== "undefined" && window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize