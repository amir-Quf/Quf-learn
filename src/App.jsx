import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home';
import AdminAnalytics from './pages/adminDashboard/adminAnalytics/AdminAnalytics';
import AdminCourseManagement from './pages/adminDashboard/adminCourseManagement/AdminCourseManagement';
import CourseDetails from './pages/courses/courseDetails/CourseDetails';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import Courses from './pages/courses/Courses';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import UserCourses from './pages/userCourses/UserCourses';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import UserComments from './pages/userComments/UserComments';
import ForgotPassword from './pages/login/forgotPassword/ForgotPassword';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/login/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/courses/' element={<Courses/>}/>
      <Route path='/courses/:courseId' element={<CourseDetails/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/my-courses' element={<UserCourses/>}/>
      <Route path='/dashboard/my-comments' element={<UserComments/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/admin/analytics' element={<AdminAnalytics/>}/>
      <Route path='/admin/courses' element={<AdminCourseManagement/>}/>
    </Routes>
  );
};

export default App;