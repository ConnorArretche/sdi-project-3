import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import PageHeader from './PageHeader'
import HomePage from './HomePage'
import AccountTransactions from './AccountTransactions'
import AccountDetails from './AccountDetails'

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
      }
    ],
  },
]);

function App(){
  return (

      <RouterProvider router = {router}/>

  )
}

export default App