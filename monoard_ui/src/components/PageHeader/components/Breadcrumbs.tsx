import styled from '@emotion/styled'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import colors from '../../../design/variables/colors'

export interface BreadCrumbLink {
  title: string
  href: string
}

interface BreadcrumbProps {
  breadcrumbs: BreadCrumbLink[]
  title: string
}

export const BlueLink = styled(Link)`
  color: ${colors.baseBlue};
`

export const StyledBreadCrumb = styled.div`
  color: ${colors.baseBlue};
  font-size: 1em;
`

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ breadcrumbs, title }) => {
  return (
    <StyledBreadCrumb>
      {breadcrumbs.map((crumb, index) => (
        <Fragment key={index}>
          {index + 1 !== breadcrumbs.length ? <><BlueLink to={crumb.href}>{crumb.title}</BlueLink> » </> : crumb.title}
        </Fragment>
      ))}
    </StyledBreadCrumb>
  )
}

export default Breadcrumbs
