export const getDefaultApiState = <reducerPathType>(reducerPath: reducerPathType) => ({
  queries: {},
  mutations: {},
  provided: {},
  subscriptions: {},
  config: {
    reducerPath,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    online: false,
    focused: false,
    middlewareRegistered: false,
    keepUnusedDataFor: 60,
  },
})
