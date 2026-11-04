import { Navigate } from 'react-router-dom'
import { ActionBar, FilterChip, FilterChips, Notice, ScreenHeader, StepHeader } from '../../components'
import { findMeal } from '../../data/sample.js'
import { practicesForMeal, PRACTICES, SEEN_ANSWERS } from '../../data/practices.js'
import { useStore } from '../../data/store.jsx'
import { REPORT_STEPS } from './shared.jsx'

// Step 2. UXTweak survey build: the task ("pick a meal and start a report") ends on this
// screen, which is the study's success URL. There's no Next button; a bold note at the bottom
// tells the participant they're done, so the task ends here rather than on a later step.
const TASK_DONE_NOTE =
  'If this is the meal you chose, you’ve finished this task. Click “Done” on the task to continue the survey.'

export default function ReportPractices() {
  const { state, actions } = useStore()
  const draft = state.draft
  if (!draft) return <Navigate to="/contribute/report/meal" replace />

  const meal = findMeal(draft.mealId)
  const keys = practicesForMeal(meal)

  const answer = (key, value) => actions.updateDraft({ practices: { ...draft.practices, [key]: value } })

  return (
    <>
      <ScreenHeader title={meal.name} backTo="/contribute/report/meal" />
      <div className="section stack-2">
        <StepHeader step={2} total={REPORT_STEPS} title="What did you see in the kitchen?">
          Say how you know. What you saw yourself counts for more than what staff told you.
        </StepHeader>
        {keys.map((key) => (
          <fieldset key={key} className="fieldset-plain summary-block">
            <legend className="t-card-header">{PRACTICES[key].label}</legend>
            <FilterChips label={PRACTICES[key].label} wrap>
              {SEEN_ANSWERS.map((a) => (
                <FilterChip
                  key={a.value}
                  selected={draft.practices[key] === a.value}
                  onClick={() => answer(key, a.value)}
                >
                  {a.label}
                </FilterChip>
              ))}
            </FilterChips>
          </fieldset>
        ))}
      </div>
      <ActionBar>
        <Notice icon="check">
          <b>{TASK_DONE_NOTE}</b>
        </Notice>
      </ActionBar>
    </>
  )
}
