import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import PageHeader from './PageHeader'
import HomePage from './HomePage'
import AccountTransactions from './AccountTransactions'
import AccountDetails from './AccountDetails'
import SettingsPage from './SettingsPage'
import NotFound from './NotFound'
import { SettingsProvider } from './SettingsContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHeader />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/transactions',
        element: <AccountTransactions/>
      },
      {
        path: '/account/:id',
        element: <AccountDetails/>
      },
      {
        path: '/settings',
        element: <SettingsPage/>
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  },
]);

function App(){
  return (
      <SettingsProvider>
        <RouterProvider router = {router}/>
      </SettingsProvider>

  )
}

export default App