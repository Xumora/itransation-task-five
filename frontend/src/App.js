import { useEffect, useCallback } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage';
import AuthForm from './pages/AuthPage/components/AuthForm/AuthForm';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'




function App() {
  const userInfo = localStorage.getItem('userInfo')
  const navigate = useNavigate()

  const tokenValidation = useCallback(async () => {
    if (userInfo) {
      try {
        await axios.get('/api/user/checkToken', {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(userInfo).token}`
          }
        })
          .then(res => {
            if (!res?.data?.success) {
              localStorage.removeItem('userInfo')
              navigate('/')
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
  }, [userInfo, navigate])

  useEffect(() => {
    tokenValidation()
  }, [userInfo, tokenValidation])

  useEffect(() => {
    if (!userInfo && window.location.pathname !== '/registration') {
      navigate('/')
    }
    if (userInfo) {
      navigate('/main')
    }
  }, [userInfo, navigate])

  let routes = useRoutes([
    {
      path: '/',
      element: <AuthPage />,
      children: [
        {
          path: '',
          element: <AuthForm type='login' />
        },
        {
          path: 'registration',
          element: <AuthForm type='register' />
        }
      ]
    },
    {
      path: '/main',
      element: userInfo && <MainPage />
    },
  ]);

  return routes;
}

export default App;
