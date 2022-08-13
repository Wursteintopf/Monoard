import styled from '@emotion/styled'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import PrivateRoute from '../../components/Routes/PrivateRoute'
import colors from '../variables/colors'

export const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${colors.baseBlue};
`

export const ContentContainer = styled.div`
  background-color: ${colors.baseGrey};
  width: 100%;
  border-top-left-radius: 40px;
  padding: 40px;
  overflow: auto;
`

const MainLayout: React.FC = () => {
  return (
    <PrivateRoute>
      <MainContainer>
        <Navigation />

        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContainer>

    </PrivateRoute>
  )
}

export default MainLayout
