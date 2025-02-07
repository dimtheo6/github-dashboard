import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage.jsx'
import RepositoriesPage from './pages/RepositoriesPage.jsx'
import FollowersPage from './pages/FollowersPage.jsx'
import HomePage from './pages/HomePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "/:username",
        element: <ProfilePage/>,
      },
      {
        path: "/:username/repositories",
        element: <RepositoriesPage/>
      },
      {
        path: "/:username/followers",
        element: <FollowersPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={router}/>
  
)
