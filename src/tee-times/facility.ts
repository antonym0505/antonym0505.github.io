export enum Facility {
  BRAINTREE = 'Braintree',
  GREEN_HARBOR = 'Green Harbor',
  PRESIDENTS = 'Presidents',
  RIDDER = 'Ridder',
}

export const aliases = {
  [Facility.BRAINTREE]: 'braintree-municipal-golf-course',
  [Facility.GREEN_HARBOR]: '',
  [Facility.PRESIDENTS]: 'presidents-golf-course',
  [Facility.RIDDER]: 'ridder-farm-golf-club',
}

export const facilityIds = {
  [Facility.BRAINTREE]: '16026',
  [Facility.GREEN_HARBOR]: '',
  [Facility.PRESIDENTS]: '17943',
  [Facility.RIDDER]: '4930',
}

export const courseIds = {
  [Facility.BRAINTREE]: '5b35850aa28c430100180b62',
  [Facility.GREEN_HARBOR]: '',
  [Facility.PRESIDENTS]: '629a019d628c4fe5e22e2c35',
  [Facility.RIDDER]: '54f14d190c8ad60378b034a4',
}

export const courseNames: { [P: string]: Facility } = {
  '5b35850aa28c430100180b62': Facility.BRAINTREE,
  '629a019d628c4fe5e22e2c35': Facility.PRESIDENTS,
  '54f14d190c8ad60378b034a4': Facility.RIDDER,
}
