import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'
import { BreadCrumbLink } from '../PageHeader/components/Breadcrumbs'

interface BreadCrumbContextProps {
  breadCrumbs: BreadCrumbLink[]
  setBreadCrumbs: Dispatch<SetStateAction<BreadCrumbLink[]>>
}

const BreadCrumbContextObject = createContext<BreadCrumbContextProps>(null as any)

interface EmptyProps {}

const BreadCrumbContext: React.FC<PropsWithChildren<EmptyProps>> = ({ children }) => {
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbLink[]>([])

  return (
    <BreadCrumbContextObject.Provider value={{ breadCrumbs, setBreadCrumbs }}>
      {children}
    </BreadCrumbContextObject.Provider>
  )
}

export const useBreadCrumbContext = () => useContext(BreadCrumbContextObject)

export default BreadCrumbContext
