import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Base } from '@wursteintopf/monoard_data_models'

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
    readOneByOwn: builder.query<Type, Partial<Type>>({
      query: model => `readOneByOwn?search=${JSON.stringify(model)}`,
      providesTags: tagTypes,
    }),
    createOwn: builder.mutation<Type, Type>({
      query: model => ({ url: 'createOwn', method: 'PUT', body: model }),
      invalidatesTags: tagTypes,
    }),
    createMultipleOwn: builder.mutation<Type[], Type[]>({
      query: modelArray => ({ url: 'createMultipleOwn', method: 'PUT', body: modelArray }),
      invalidatesTags: tagTypes,
    }),
    updateOwn: builder.mutation<Type, Type>({
      query: model => ({ url: 'updateOwn', method: 'POST', body: model }),
      invalidatesTags: tagTypes,
    }),
    deleteOwn: builder.mutation<{ id: number }, number>({
      query: id => ({ url: 'deleteOwn', method: 'DELETE', body: { id } }),
      invalidatesTags: tagTypes,
    }),
  }
}
