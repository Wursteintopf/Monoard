import moment from 'moment'

export const startOfMonth = (date: Date): Date => {
  return moment(date).startOf('month').toDate()
}

export const endOfMonth = (date: Date): Date => {
  return moment(date).endOf('month').toDate()
}
