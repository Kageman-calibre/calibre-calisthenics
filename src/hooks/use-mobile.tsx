
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Initial check
    checkIsMobile()
    
    // Modern browsers
    if (mql.addEventListener) {
      mql.addEventListener("change", checkIsMobile)
      return () => mql.removeEventListener("change", checkIsMobile)
    } else {
      // Fallback for older browsers
      mql.addListener(checkIsMobile)
      return () => mql.removeListener(checkIsMobile)
    }
  }, [])

  return !!isMobile
}
