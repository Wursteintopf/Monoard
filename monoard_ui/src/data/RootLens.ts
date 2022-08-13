import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { lensPath, view, set } from 'ramda'
import { RootState, setRootStateAction, store } from './RootReducer'

export type Lens<A> = {
  select: () => A
  get: () => A
  set: (a: A) => void
  __path: string[]
} & (A extends Record<string, any> ? {
  [Key in keyof A]-?: Lens<A[Key]>
} : Record<string, never>)

const lensAtPath = <A>(path: string[]): Lens<A> => {
  const getRootState = (): RootState => {
    return store.getState()
  }

  const setRootState = (newState: RootState) => {
    store.dispatch(setRootStateAction(newState))
  }

  const lens = lensPath(path)

  const getValue = () => view(lens, getRootState())

  const setValue = (value: A) => { setRootState(set(lens, value, getRootState())) }

  const value = getValue()

  const select = () => useSelector(createSelector((state: RootState) => state, state => view(lens, state)))

  let subLenses = {}
  if (typeof value === 'object') {
    subLenses = Object.keys(value).reduce<Record<string, Lens<any>>>((prev, key) => {
      const sub = view(lensPath([...path, key]), getRootState())
      prev[key] = lensAtPath<typeof sub>([...path, key])
      return prev
    }, {})
  }
  // TODO: Handle arrays

  return {
    select,
    set: setValue,
    get: getValue,
    __path: path,
    ...subLenses,
  } as unknown as Lens<A>
}

export const rootLens = lensAtPath<RootState>([])
