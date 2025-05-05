interface TeeTime {
  courseId: string
  teetime: string
  backNine: boolean
  players: []
  rates: [
    {
      _id: number
      name: string
      externalId: string
      allowedPlayers: number[]
      holes: number
      icons: []
      tags: string[]
      golfnow: {
        TTTeeTimeId: number
        GolfFacilityId: number
        GolfCourseId: number
      }
      trade: boolean
      dueOnlineWalking: number
      greenFeeWalking: number
      acceptCreditCard: number
      transactionFees: number
      showTransactionFees: boolean
      showAsHotDeal: boolean
      isSimulator: boolean
    }
  ]
  bookedPlayers: number
  minPlayers: number
  maxPlayers: number
  source: string
  fromCache: boolean
}

export default TeeTime
