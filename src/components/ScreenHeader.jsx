import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { historyIndex, pathAt } from './backStack.js'

// Header / back pattern for every screen below a tab root.
// `backTo` gives a fixed destination (use it in step-by-step flows).
// `fallbackTo` returns the way you came — for screens reachable from many places — and is only
// used when there's nothing to go back to (e.g. the screen was opened from a link).
// With neither, Back returns to the previous screen.
export default function ScreenHeader({ title, back = true, backTo, fallbackTo, action }) {
  const navigate = useNavigate()
  const goBack = () => {
    const idx = historyIndex()
    const previous = idx > 0 ? pathAt(idx - 1) : undefined
    if (backTo) {
      // Step back for real when the destination is the screen we came from; otherwise swap this
      // entry for the destination. Never push — pushing made Back bounce between two screens.
      if (previous === backTo.split('?')[0]) navigate(-1)
      else navigate(backTo, { replace: true })
    } else if (idx === 0) navigate(fallbackTo ?? '/', { replace: true })
    else navigate(-1)
  }
  return (
    <header className="header">
      {back && (
        <button type="button" className="icon-btn" aria-label="Back" onClick={goBack}>
          <Icon name="back" size={22} />
        </button>
      )}
      <h1 className="header__title t-card-header">{title}</h1>
      {action}
    </header>
  )
}
