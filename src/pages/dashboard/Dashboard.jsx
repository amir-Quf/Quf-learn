import { Container } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import "./Dashboard.css";
import Profile from "./profile/Profile";
import UserCourses from "./userCourses/UserCourses";
import Footer from "../../components/footer/Footer";
import UserComments from "./userComments/UserComments";

const Dashboard = () => {
  
  return (
    <div>
      <MyNavbar />
      <Container style={{ marginTop: "80px" }}>
        <Profile/>
        <UserCourses/>
        <UserComments/>
      </Container>
      <Footer/>
    </div>
  );
};

export default Dashboard;
