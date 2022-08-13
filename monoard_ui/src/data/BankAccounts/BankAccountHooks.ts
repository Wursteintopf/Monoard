import { useParams } from 'react-router-dom'
import { bankAccountApi } from './BankAccountReducer'

export const useCurrentBankAccount = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data, isFetching, isLoading, refetch } = bankAccountApi.endpoints.readOneByOwn.useQuery({ slug })

  return {
    data,
    bankAccount: data,
    isFetching,
    isLoading,
    refetchCurrentBankAccount: refetch,
  }
}

export const useBankAccounts = () => {
  const { data, isFetching, isLoading, refetch } = bankAccountApi.endpoints.readAllOwn.useQuery()

  return {
    data,
    bankAccounts: data,
    isFetching,
    isLoading,
    refetchBankAccounts: refetch,
  }
}
