import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

import { courseIds, Facility } from '../facility'
import { TeeTimeContext } from '../tee-time-context'
import { Filter } from './filter'
import useOutsideClickHandler from './use-outside-click'

export const CourseFilter: FC = () => {
  const { filter, setFilter } = useContext(TeeTimeContext)

  const [hidden, setHidden] = useState<boolean>(true)

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClickHandler(ref, () => setHidden(true))

  const toggleCourse = useCallback(
    (facility: Facility) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        setFilter((prevState) => {
          const stateCopy = new Filter(prevState)
          stateCopy.courseIds = new Set(stateCopy.courseIds)
          if (e.target.checked) stateCopy.courseIds.add(courseIds[facility])
          else stateCopy.courseIds.delete(courseIds[facility])
          return stateCopy
        })
      }
    },
    [setFilter]
  )

  return (
    <div ref={ref}>
      <div
        className="filter"
        hidden={hidden}
        style={{ flexDirection: 'column' }}
      >
        <label>
          {Facility.BRAINTREE}
          <input
            type="checkbox"
            checked={filter.courseIds.has(courseIds[Facility.BRAINTREE])}
            onChange={toggleCourse(Facility.BRAINTREE)}
          />
        </label>
        <label>
          {Facility.GREEN_HARBOR}
          <input
            disabled
            type="checkbox"
            checked={filter.courseIds.has(courseIds[Facility.GREEN_HARBOR])}
            onChange={toggleCourse(Facility.GREEN_HARBOR)}
          />
        </label>
        <label>
          {Facility.PRESIDENTS}
          <input
            type="checkbox"
            checked={filter.courseIds.has(courseIds[Facility.PRESIDENTS])}
            onChange={toggleCourse(Facility.PRESIDENTS)}
          />
        </label>
        <label>
          {Facility.RIDDER}
          <input
            type="checkbox"
            checked={filter.courseIds.has(courseIds[Facility.RIDDER])}
            onChange={toggleCourse(Facility.RIDDER)}
          />
        </label>
      </div>
      <span
        className="material-symbols-outlined"
        role="button"
        onClick={() => setHidden((prevState) => !prevState)}
      >
        filter_alt
      </span>
    </div>
  )
}
