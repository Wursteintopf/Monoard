export type Nullable<A> = {
  [Key in keyof A]?: A[Key]
}
