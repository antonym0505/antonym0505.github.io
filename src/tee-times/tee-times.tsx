import dayjs from 'dayjs'
import { FC, useContext } from 'react'

import { courseNames } from './facility'
import { TeeTimeContext } from './tee-time-context'
import './tee-times.css'
import { CourseFilter, PlayerFilter, TimeFilter } from './filters'

export const TeeTimeTable: FC = () => {
  const { date, setDate, dayInfo, loading, teeTimes, warnings } =
    useContext(TeeTimeContext)

  return (
    <main id="tee-times">
      <h2>local tee times (quincy, ma)</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="date"
          value={date.format('YYYY-MM-DD')}
          onChange={(e) => setDate(dayjs(e.target.value))}
        />
        <span className="material-symbols-outlined">light_mode</span>
        <span>
          {!dayInfo.sunrise ? 'N/A' : dayjs(dayInfo.sunrise).format('h:mm A')}
        </span>
        <span className="material-symbols-outlined">dark_mode</span>
        <span>
          {!dayInfo.sunset ? 'N/A' : dayjs(dayInfo.sunset).format('h:mm A')}
        </span>
      </div>
      {[...warnings.entries()].map(([facility, message]) => (
        <div key={facility} style={{ display: 'flex', gap: '1rem' }}>
          <span className="material-symbols-outlined">warning</span>
          <span>
            {facility}: {message}
          </span>
        </div>
      ))}
      <table
        className={`loading-${loading}`}
        style={{ flex: 1, width: '100%' }}
      >
        <thead>
          <tr>
            <th>
              <div>
                <span>Course</span>
                <CourseFilter />
              </div>
            </th>
            <th>
              <div>
                <span>Time</span>
                <TimeFilter />
              </div>
            </th>
            <th>
              <div>
                <span>Players</span>
                <PlayerFilter />
              </div>
            </th>
            <th>
              <div>
                <span>Cost</span>
                {/* <span className="material-symbols-outlined">filter_alt</span> */}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {teeTimes.map((teeTime, index) => (
            <tr key={index}>
              <td>{courseNames[teeTime.courseId]}</td>
              <td>{dayjs(teeTime.teetime).format('h:mm A')}</td>
              <td>{teeTime.maxPlayers}</td>
              <td>${teeTime.rates?.[0].greenFeeWalking / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
