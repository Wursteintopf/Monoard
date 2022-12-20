import React, { ReactNode } from 'react'

import BankAccountIcon from '@mui/icons-material/AccountBalance'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SavingsIcon from '@mui/icons-material/Savings'
import MenuBookIcon from '@mui/icons-material/MenuBook'

const Dashboard = React.lazy(() => import(/* webpackChunkName: 'Dashboard' */ './pages/Dashboard/DashboardPage'))
const Konten = React.lazy(() => import(/* webpackChunkName: 'Konten' */ './pages/BankAccounts/BankAccountPage'))
const Settings = React.lazy(() => import(/* webpackChunkName: 'Settings' */ './pages/Settings/SettingsPage'))
const BankAccountListPage = React.lazy(() => import(/* webpackChunkName: 'BankAccountListPage' */ './pages/BankAccounts/BankAccountListPage/BankAccountListPage')) 
const BankAccountDetailPage = React.lazy(() => import(/* webpackChunkName: 'BankAccountDetailPage' */ './pages/BankAccounts/BankAccountDetailPage/BankAccountDetailPage'))
const MonthOverview = React.lazy(() => import(/* webpackChunkName: 'MonthOverview Page' */ './pages/MonthOverview/MonthOverviewPage'))
const Budget = React.lazy(() => import(/* webpackChunkName: 'Budget Page' */ './pages/Budget/BudgetPage'))
const Report = React.lazy(() => import(/* webpackChunkName: 'Report Page' */ './pages/Report/ReportPage'))
const EurHelper = React.lazy(() => import(/* webpackChunkName: 'EÜR Helper' */ './pages/EurHelper/EurHelper'))

export interface PageRoute {
  path: string
  title: string
  element: ReactNode
  hideInMenu?: boolean
  icon?: ReactNode
  subroutes?: PageRoute[]
}

export const routes: PageRoute[] = [
  {
    path: '',
    title: 'Dashboard',
    element: <Dashboard />,
    icon: <DashboardIcon />,
  },
  {
    path: 'reports',
    title: 'Reports',
    element: <Report />,
    icon: <AssessmentIcon />,
  },
  {
    path: 'month',
    title: 'Monatsübersicht',
    element: <MonthOverview />,
    icon: <CalendarMonthIcon />,
  },
  {
    path: 'eurhelper',
    title: 'EÜR Helper',
    element: <EurHelper />,
    icon: <MenuBookIcon />,
  },
  {
    path: 'budget',
    title: 'Budgetplanung',
    element: <Budget />,
    icon: <SavingsIcon />,
  },
  {
    path: 'bankaccount',
    title: 'Konten',
    element: <Konten />,
    icon: <BankAccountIcon />,
    subroutes: [
      {
        path: '',
        title: 'Kontenliste',
        element: <BankAccountListPage />,
      },
      {
        path: 'detail/:slug',
        title: 'Kontendetails',
        element: <BankAccountDetailPage />,
      },
    ],
  },
  {
    path: 'settings',
    title: 'Einstellungen',
    element: <Settings />,
    icon: <SettingsIcon />,
  },
]
