import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NavLink } from 'react-router-dom'
import colors from '../../design/variables/colors'
import LogoutIcon from '@mui/icons-material/Logout'
import { authApi } from '../../data/Auth/AuthReducer'
import { routes } from '../../routes'

const NavigationContainer = styled.div<{ collapsed: boolean }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
    
  ${props => css`
    width: ${props.collapsed ? 80 : 250}px;
  `}
`

const CollapseButton = styled.div<{ collapsed: boolean }>`
  position: absolute;
  color: ${colors.baseGrey};
  top: 20px;
  right: 20px;
  transition: 0.3s;
  transform: rotate(${props => props.collapsed ? '-180deg' : '0deg'});
`

const LinkContainer = styled.div`
  margin-top: 80px;
  padding: 14px;
`

export const LogoutButtonContainer = styled.div`
  margin-top: auto;
  padding: 14px;
`

const NavButton = styled.div<{ active?: boolean, collapsed: boolean }>`
  display: flex;
  align-items: center;
  color: ${colors.baseGrey};
  padding: 15px;
  margin-bottom: 7px;
  border-radius: 10px;
  background-color: ${props => props.active ? colors.darkBlue : 'transparent'};
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkBlue};
  }

  div {
    margin-left: 10px;
    transition: 0.3s;
    visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
    opacity: ${props => props.collapsed ? '0' : '1'};
  }
`

const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [logout] = authApi.endpoints.logout.useMutation()

  useEffect(() => {
    setCollapsed(localStorage.getItem('monoard_nav_collapsed') === 'true')
  }, [])

  const doLogout = () => {
    logout()
  }

  return (
    <NavigationContainer collapsed={collapsed}>
      <CollapseButton collapsed={collapsed}>
        <IconButton
          color='secondary'
          onClick={() => { 
            setCollapsed(!collapsed)
            localStorage.setItem('monoard_nav_collapsed', (!collapsed).toString())
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </CollapseButton>
      <LinkContainer>
        {routes.filter(route => !route.hideInMenu).map(route => (
          <NavLink key={route.path} to={'/' + route.path}>
            {({ isActive }) => (
              <NavButton active={isActive} collapsed={collapsed}>
                {route.icon}
                <div>{route.title}</div>
              </NavButton>
            )}
          </NavLink>
        ))}
      </LinkContainer>
      <LogoutButtonContainer>
        <NavButton collapsed={collapsed} onClick={doLogout}>
          <LogoutIcon />
          <div>Logout</div>
        </NavButton>
      </LogoutButtonContainer>
    </NavigationContainer>
  )
}

export default Navigation
