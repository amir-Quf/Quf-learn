import './AdminDashboard.css'
import MyNavbar from '../../components/nav/Nav'
import { Container } from 'react-bootstrap'
import AdminProfile from './adminProfile/AdminProfile'
import AdminCourses from './adminCourseManagement/AdminCourses'
import PageWrapper from '../../components/pageWrapper'
const AdminDashboard = () => {
  return (
    <PageWrapper>
      <MyNavbar/>
      <Container style={{marginTop : '80px'}}>
      <AdminProfile/>
      <AdminCourses/>
      </Container>
    </PageWrapper>
  )
}

export default AdminDashboard
