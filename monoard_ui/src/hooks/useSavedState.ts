import { useEffect, useState } from 'react'

export const useSavedState = <T>(initialValue: T, saveKey: string): [value: T, setValue: (newVal: T) => void] => {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    const localState = localStorage.getItem(saveKey)
    if (localState) setState(JSON.parse(localState))
  }, [])

  const changeState = (newVal: T) => {
    localStorage.setItem(saveKey, JSON.stringify(newVal))
    setState(newVal)
  }

  return [state, changeState]
}
