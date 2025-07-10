import { Container } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import "./Dashboard.css";
import Profile from "./profile/Profile";
import UserCourses from "./userCourses/UserCourses";

const Dashboard = () => {
  
  return (
    <div>
      <MyNavbar />
      <Container style={{ marginTop: "80px" }}>
        <Profile/>
        <UserCourses/>
      </Container>
    </div>
  );
};

export default Dashboard;
