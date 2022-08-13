import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { globalStyles } from './design/global'
import { theme } from './design/muiTheme'
import { Provider } from 'react-redux'
import { store } from './data/RootReducer'
import MainLayout from './design/layouts/MainLayout'
import { PageRoute, routes } from './routes'

const Login = React.lazy(() => import(/* webpackChunkName: 'Login' */ './pages/Login/LoginPage'))

const renderRoute = (route: PageRoute) => {
  const additionalOptions = route.path === '' ? { index: true } : { path: route.path + '/*' }

  return (
    <Route
      key={route.path}
      {...additionalOptions}
      element={<Suspense>{route.element}</Suspense>}
    >
      {route.subroutes?.map(renderRoute)}
    </Route>
  )
}

function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Global styles={globalStyles} />

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<MainLayout />}>
              {routes.map(renderRoute)}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
