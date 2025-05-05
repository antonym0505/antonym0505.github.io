import { FC, useCallback, useContext, useRef, useState } from 'react'

import { TeeTimeContext } from '../tee-time-context'
import { Filter } from './filter'
import useOutsideClickHandler from './use-outside-click'

export const PlayerFilter: FC = () => {
  const { filter, setFilter } = useContext(TeeTimeContext)

  const [hidden, setHidden] = useState<boolean>(true)

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClickHandler(ref, () => setHidden(true))

  const setPlayers = useCallback(
    (players: number) => {
      setFilter((prevState) => new Filter({ ...prevState, players }))
    },
    [setFilter]
  )

  return (
    <div ref={ref}>
      <div className="filter" hidden={hidden}>
        <button
          className={`active-${filter.players === 1}`}
          onClick={() => setPlayers(1)}
        >
          1
        </button>
        <button
          className={`active-${filter.players === 2}`}
          onClick={() => setPlayers(2)}
        >
          2
        </button>
        <button
          className={`active-${filter.players === 3}`}
          onClick={() => setPlayers(3)}
        >
          3
        </button>
        <button
          className={`active-${filter.players === 4}`}
          onClick={() => setPlayers(4)}
        >
          4
        </button>
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
