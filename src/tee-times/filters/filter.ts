import dayjs from 'dayjs'
import { courseIds } from '../facility'

export class Filter {
  courseIds: Set<string> = new Set(Object.values(courseIds))
  startTime?: dayjs.Dayjs
  endTime?: dayjs.Dayjs
  players: number = 1

  constructor(filter?: Filter) {
    if (!filter) return
    this.courseIds = new Set(filter.courseIds)
    this.startTime = filter.startTime
    this.endTime = filter.endTime
    this.players = filter.players
  }
}
