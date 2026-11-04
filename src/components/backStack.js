import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Remembers which path sits at each browser-history position in this tab, so a Back button
// can tell whether its destination is simply the previous screen (then it goes back) or not
// (then it replaces the current entry instead of piling up a loop of screens).
const paths = []

export const historyIndex = () => window.history.state?.idx ?? 0

export const pathAt = (idx) => paths[idx]

// Call once, near the top of the app.
export function useTrackBackStack() {
  const location = useLocation()
  const navigationType = useNavigationType()
  useEffect(() => {
    const idx = historyIndex()
    paths[idx] = location.pathname
    if (navigationType === 'PUSH') paths.length = idx + 1
  }, [location, navigationType])
}
