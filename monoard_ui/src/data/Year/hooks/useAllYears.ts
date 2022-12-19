import { yearApi } from '../YearReducer'

export const useAllYears = () => {
  const { data } = yearApi.endpoints.readAllOwn.useQuery()

  return data ? [...data].sort((a, b) => b.year - a.year) : undefined
}
