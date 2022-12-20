export type ReversePartial<T> = {
  [P in keyof T]-?: T[P];
}
