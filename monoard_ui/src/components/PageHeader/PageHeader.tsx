import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React, { Fragment, ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '../../design/components/LayoutElements/Box'
import Flex from '../../design/components/LayoutElements/Flex'
import { MainHeadline } from '../../design/components/Typography/Typography'
import colors from '../../design/variables/colors'
import MoreIcon from '@mui/icons-material/MoreVert'
import { useOutsideClick } from '../../design/hooks/useOutsideClick'
import { Spacing } from '../../design/types'
import Breadcrumbs, { BreadCrumbLink } from './components/Breadcrumbs'

interface PageHeaderButtonProps {
  text: string
  icon?: ReactNode
  href?: string
  onClick?: () => void
  isLink?: boolean
}

export interface PageHeaderMainButtonProps extends PageHeaderButtonProps {
  iconOnly?: boolean
}

export interface PageHeaderContextMenuButtonProps
  extends PageHeaderButtonProps {}

interface PageHeaderProps {
  title: string
  breadcrumbs?: BreadCrumbLink[]
  mainButtons?: PageHeaderMainButtonProps[]
  contextMenu?: (PageHeaderContextMenuButtonProps | 'divider')[]
  mb?: Spacing
}

const MenuButton: React.FC<{
  button: PageHeaderMainButtonProps | PageHeaderContextMenuButtonProps
  variant?: 'text' | 'outlined' | 'contained'
}> = ({ button, variant = 'text' }) => {
  const linkOption = button.isLink
    ? {
        component: Link,
        to: button.href || '',
      }
    : {}
  
  const styleOption = variant === 'text'
    ? {
        style: {
          padding: '10px 25px',
        },
      }
    : {}

  const handleOnClick = button.onClick
  
  return (
    <Button {...styleOption} {...linkOption} variant={variant} startIcon={button.icon} onClick={handleOnClick}>
      {button.text}
    </Button>
  )
}

const ButtonArea = styled(Flex)`
  position: relative;
`

const ContextMenu = styled.div`
  position: absolute;
  z-index: 1000;
  top: 45px;
  right: 0px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
`

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  mainButtons,
  contextMenu,
  mb = 'm',
}) => {
  const [contextMenuOpen, setContextMenuOpen] = useState(false)

  const ref = useOutsideClick(() => setContextMenuOpen(false))

  return (
    <Flex justifyContent='space-between' mb={mb}>
      <Box>
        <MainHeadline>{title}</MainHeadline>
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} title={title} />}
      </Box>
      <ButtonArea gap='s' height='40px'>
        {mainButtons?.map((button, index) => (
          <MenuButton key={index} button={button} variant='outlined' />
        ))}
        {contextMenu && contextMenu?.length > 0 && (
          <Button
            ref={ref}
            style={{ maxWidth: 40, padding: 0, minWidth: 40 }}
            variant='outlined'
            onClick={() => setContextMenuOpen(!contextMenuOpen)}
          >
            <MoreIcon />
          </Button>
        )}
        {contextMenuOpen && (
          <ContextMenu>
            {contextMenu?.map((button, index) => {
              if (button === 'divider') return <></>
              return <MenuButton key={index} button={button} />
            })}
          </ContextMenu>
        )}

      </ButtonArea>
    </Flex>
  )
}

export default PageHeader
