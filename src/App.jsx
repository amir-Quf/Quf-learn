import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home';
import CourseDetails from './pages/courses/courseDetails/CourseDetails';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import Courses from './pages/courses/Courses';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import UserCourses from './pages/dashboard/userCourses/UserCourses';
import Register from './pages/register/Register';
import UserComments from './pages/dashboard/userComments/UserComments';
import ForgotPassword from './pages/login/forgotPassword/ForgotPassword';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import AddCourse from './pages/adminDashboard/addCourse/AddCourse';
import EditCourse from './pages/adminDashboard/editCourse/EditCourse';
import About from './pages/about/About';
import { AnimatePresence } from 'motion/react';

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/login/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/courses/' element={<Courses/>}/>
      <Route path='/courses/:courseId' element={<CourseDetails/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/dashboard/' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
        }/>
      <Route path='/my-courses' element={
        <PrivateRoute>
          <UserCourses/>
        </PrivateRoute>
        }/>
      <Route path='/dashboard/my-comments' element={
        <PrivateRoute>
          <UserComments/>
        </PrivateRoute>
        }/>
      <Route path='/admin' element={
        <AdminRoute>
          <AdminDashboard/>
        </AdminRoute>
        }/>
      <Route path='/admin/add-course' element={
        <AdminRoute>
          <AddCourse/>
        </AdminRoute>
        }/>
        <Route path='/admin/edit-course/:courseId' element={
        <AdminRoute>
          <EditCourse/>
        </AdminRoute>
        }/>
    </Routes>
    </AnimatePresence>
  );
};

export default App;