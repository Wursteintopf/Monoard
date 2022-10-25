import { Lens, rootLens } from './../RootLens'
import { useEffect } from 'react'
import { Month } from '../../data_types/Month'

export const useSelectedMonth = (): Lens<Month> => {
  const selectedMonth = rootLens.ui.selectedMonth
  const LOCAL_STORAGE_KEY = 'selectedMonth'

  useEffect(() => {
    const localState = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (localState) selectedMonth.set(localState as Month)
  }, [])

  const modifiedSet = (newMonth: Month) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newMonth)
    selectedMonth.set(newMonth)
  }

  return {
    get: selectedMonth.get,
    select: selectedMonth.select,
    set: modifiedSet,
    __path: selectedMonth.__path,
  }
}
