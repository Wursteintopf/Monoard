import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCurrentBankAccount } from '../../../../data/BankAccounts/BankAccountHooks'
import LoadingIndicator from '../../../../design/components/LoadingIndicator/LoadingIndicator'
import PageHeader, {
  PageHeaderContextMenuButtonProps,
  PageHeaderMainButtonProps,
} from '../../../../components/PageHeader/PageHeader'
import AddOrEditBankAccountModal from '../../../../components/BankAccountModals/AddOrEditBankAccountModal'
import DeleteBankAccountModal from '../../../../components/BankAccountModals/DeleteBankAccountModal'
import CSVUploadModal from '../../../../components/CSVUploadModal/CSVUploadModal'
import { useBreadCrumbContext } from '../../../../components/BreadCrumbContext/BreadCrumbContext'
import { Month, monthArray, monthsReadableGerman } from '../../../../data_types/Month'
import { useSelectedMonth } from '../../../../data/Ui/UiHooks'

const BankAccountDetailPageHeader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { bankAccount } = useCurrentBankAccount()
  const selectedMonth = useSelectedMonth()

  const { breadCrumbs: additionalBreadCrumbsLinks } = useBreadCrumbContext()

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [csvModalOpen, setCsvModalOpen] = useState(false)

  const { data, isLoading } = useCurrentBankAccount()

  const mainSelects = [
    {
      value: selectedMonth.select(),
      onChange: (value: Month) => selectedMonth.set(value),
      options: monthArray.map(m => ({ value: m, label: monthsReadableGerman[m] })),
    },
  ]

  const mainButtons: PageHeaderMainButtonProps[] = [
    {
      text: 'CSV hochladen',
      onClick: () => setCsvModalOpen(true),
    },
  ]

  const contextMenu: PageHeaderContextMenuButtonProps[] = [
    {
      text: 'Bearbeiten',
      icon: <EditIcon />,
      onClick: () => setEditModalOpen(true),
    },
    {
      text: 'Löschen',
      icon: <DeleteIcon />,
      onClick: () => setDeleteModalOpen(true),
    },
  ]

  if (isLoading || !data) return <LoadingIndicator />

  return (
    <>
      <PageHeader
        title={data.name || ''}
        breadcrumbs={[
          { title: 'Konten', href: '/bankaccount' },
          {
            title: bankAccount?.name || '',
            href: `/bankaccount/detail/${slug}`,
          },
          ...additionalBreadCrumbsLinks,
        ]}
        mainSelects={mainSelects}
        mainButtons={mainButtons}
        contextMenu={contextMenu}
      />
      <AddOrEditBankAccountModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        forwardToDetailPage
        editMode
        slug={slug}
      />
      <DeleteBankAccountModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        forwardToListPage
        id={bankAccount?.id as number}
      />
      <CSVUploadModal
        open={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
      />
    </>
  )
}

export default BankAccountDetailPageHeader
