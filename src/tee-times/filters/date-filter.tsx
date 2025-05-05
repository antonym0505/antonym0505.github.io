import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import useOutsideClickHandler from './use-outside-click'
import { TeeTimeContext } from '../tee-time-context'
import { Filter } from './filter'

export const TimeFilter: FC = () => {
  const { date, filter, setFilter } = useContext(TeeTimeContext)

  const [hidden, setHidden] = useState<boolean>(true)

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClickHandler(ref, () => setHidden(true))

  const startTime = useMemo(
    () => filter.startTime?.format('HH:mm') ?? '',
    [filter.startTime]
  )
  const endTime = useMemo(
    () => filter.endTime?.format('HH:mm') ?? '',
    [filter.endTime]
  )

  const setStartTime = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const [hour, minute] = e.target.value.split(/:/)
      setFilter((prevState) => {
        const stateCopy = new Filter(prevState)
        stateCopy.startTime = date.hour(Number(hour)).minute(Number(minute))
        return stateCopy
      })
    },
    [date, setFilter]
  )

  const setEndTime = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const [hour, minute] = e.target.value.split(/:/)
      setFilter((prevState) => {
        const stateCopy = new Filter(prevState)
        stateCopy.endTime = date.hour(Number(hour)).minute(Number(minute))
        console.log(stateCopy.endTime.format('HH:mm'))
        return stateCopy
      })
    },
    [date, setFilter]
  )

  return (
    <div ref={ref}>
      <div className="filter" hidden={hidden}>
        <input
          type="time"
          max={endTime}
          onChange={setStartTime}
          value={startTime}
        />
        &mdash;
        <input
          type="time"
          min={startTime}
          onChange={setEndTime}
          value={endTime}
        />
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
