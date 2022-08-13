import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Base } from '../../data_types/Base'
import { Nullable } from '../../data_types/UtilTypes'

export const getBaseCrudOwnEndpoints = <Type extends Base, ReducerPath extends string>(
  builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, FetchBaseQueryMeta>, any, ReducerPath>,
  tagTypes?: string[],
) => {
  return {
    readOwn: builder.query<Type, number>({
      query: id => `readOwn?id=${id}`,
      providesTags: tagTypes,
    }),
    readAllOwn: builder.query<Type[], void>({
      query: () => 'readAllOwn',
      providesTags: tagTypes,
    }),
    readOneByOwn: builder.query<Type, Nullable<Type>>({
      query: model => `readOneByOwn?search=${JSON.stringify(model)}`,
      providesTags: tagTypes,
    }),
    addOwn: builder.mutation<void, Type>({
      query: model => ({ url: 'createOwn', method: 'PUT', body: model }),
      invalidatesTags: tagTypes,
    }),
    addMultipleOwn: builder.mutation<void, Type[]>({
      query: modelArray => ({ url: 'createMultipleOwn', method: 'PUT', body: modelArray }),
      invalidatesTags: tagTypes,
    }),
    editOwn: builder.mutation<void, Type>({
      query: model => ({ url: 'updateOwn', method: 'POST', body: model }),
      invalidatesTags: tagTypes,
    }),
    deleteOwn: builder.mutation<void, number>({
      query: id => ({ url: 'deleteOwn', method: 'DELETE', body: { id } }),
      invalidatesTags: tagTypes,
    }),
  }
}
