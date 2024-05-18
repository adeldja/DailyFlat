import { Route, Routes } from 'react-router'
import './App.css'
import AuthProvider from './provider/AuthProvider'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'
import MealSearchPagination from './pages/Blog/MealSearchPagination'
import MealDetails from './pages/Blog/MealDetails'
import UserSettingsForm from './pages/settings/UserSettingsForm'
import ProtectedRoute from './routes/ProtectedRoute'
import Todos from './pages/Todo/Todos'


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/MealSearchPagination" element={<MealSearchPagination />} />
          <Route path="/meal/:idMeal" element={<MealDetails/>} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/todos" element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <UserSettingsForm />
            </ProtectedRoute>
          } />

          
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
