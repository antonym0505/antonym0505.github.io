import dayjs from 'dayjs'
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Outlet } from 'react-router'

import { aliases, courseIds, Facility, facilityIds } from './facility'
import { Filter } from './filters'
import ResponseJson from './response-json'
import TeeTime from './tee-time'
import useUtils from './use-utils'

class TeeTimeState {
  date: dayjs.Dayjs = dayjs()
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>> = () => {}
  dayInfo: Partial<ResponseJson['dayInfo']> = {}
  filter: Filter = new Filter()
  setFilter: Dispatch<SetStateAction<Filter>> = () => {}
  loading: boolean = false
  teeTimes: TeeTime[] = []
  warnings: Map<Facility, string> = new Map()
}

export const TeeTimeContext = createContext(new TeeTimeState())

export const TeeTimeProvider: FC = () => {
  const { isValidJSON } = useUtils()

  const [date, setDate] = useState<dayjs.Dayjs>(dayjs())
  const [dayInfo, setDayInfo] = useState<Partial<ResponseJson['dayInfo']>>({})
  const [filter, setFilter] = useState<Filter>(new Filter())
  const [loading, setLoading] = useState<boolean>(false)
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([])
  const [warnings, setWarnings] = useState<Map<Facility, string>>(new Map())

  const filteredTeeTimes = useMemo(() => {
    return teeTimes
      .filter(({ courseId }) => filter.courseIds.has(courseId))
      .filter(({ teetime }) => !filter.startTime?.isAfter(teetime))
      .filter(({ teetime }) => !filter.endTime?.isBefore(teetime))
      .filter(({ maxPlayers }) => filter.players <= maxPlayers)
      .sort((t0, t1) => (dayjs(t0.teetime).isBefore(t1.teetime) ? -1 : 1))
  }, [filter, teeTimes])

  const getInput = useCallback(
    (facility: Facility): URL => {
      const url = new URL(
        '/v2/tee-times',
        'https://phx-api-be-east-1b.kenna.io'
      )
      url.searchParams.append('date', date.format('YYYY-MM-DD'))
      url.searchParams.append('facilityIds', facilityIds[facility])
      return url
    },
    [date]
  )

  const getInit = useCallback((facility: Facility): RequestInit => {
    const headers = new Headers()
    headers.set('x-be-alias', aliases[facility])
    return { method: 'GET', headers }
  }, [])

  const fetchTeeTimes = useCallback(
    async (facility: Facility) => {
      try {
        setLoading(true)
        setWarnings((prevState) => {
          const stateCopy = new Map(prevState)
          stateCopy.delete(facility)
          return stateCopy
        })
        const response = await fetch(getInput(facility), getInit(facility))
        if (response.ok) {
          const json = await response.json()
          if (isValidJSON(json)) {
            setDayInfo(json[0].dayInfo)
            setTeeTimes((prevState) =>
              prevState
                .filter(({ courseId }) => courseId !== courseIds[facility])
                .concat(json[0].teetimes)
                .sort((t0, t1) =>
                  dayjs(t0.teetime).isBefore(t1.teetime) ? -1 : 1
                )
            )
            if (json[0].message) {
              setWarnings((prevState) =>
                new Map(prevState).set(facility, json[0].message!)
              )
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    },
    [getInput, getInit]
  )

  useEffect(() => {
    fetchTeeTimes(Facility.BRAINTREE)
    fetchTeeTimes(Facility.PRESIDENTS)
    fetchTeeTimes(Facility.RIDDER)
  }, [fetchTeeTimes])

  return (
    <TeeTimeContext.Provider
      value={{
        date,
        setDate,
        dayInfo,
        filter,
        setFilter,
        loading,
        teeTimes: filteredTeeTimes,
        warnings,
      }}
    >
      <Outlet />
    </TeeTimeContext.Provider>
  )
}
