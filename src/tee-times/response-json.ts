import TeeTime from './tee-time'

interface ResponseJson {
  courseId: string
  dayInfo: { dawn: string; dusk: string; sunrise: string; sunset: string }
  fromCache: false
  message?: string
  teetimes: TeeTime[]
  totalAvailableTeetimes: number
}

export default ResponseJson
