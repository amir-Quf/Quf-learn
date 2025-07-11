import './AdminDashboard.css'
import MyNavbar from '../../components/nav/Nav'
import { Container } from 'react-bootstrap'
import AdminProfile from './adminProfile/AdminProfile'
import AdminCourses from './adminCourseManagement/AdminCourses'
const AdminDashboard = () => {
  return (
    <div>
      <MyNavbar/>
      <Container style={{marginTop : '80px'}}>
      <AdminProfile/>
      <AdminCourses/>
      </Container>
    </div>
  )
}

export default AdminDashboard
