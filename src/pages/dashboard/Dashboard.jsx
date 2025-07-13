import { Container } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import "./Dashboard.css";
import Profile from "./profile/Profile";
import UserCourses from "./userCourses/UserCourses";
import Footer from "../../components/footer/Footer";
import UserComments from "./userComments/UserComments";
import PageWrapper from "../../components/pageWrapper";

const Dashboard = () => {
  
  return (
    <PageWrapper>
      <MyNavbar />
      <Container style={{ marginTop: "80px" }}>
        <Profile/>
        <UserCourses/>
        <UserComments/>
      </Container>
      <Footer/>
    </PageWrapper>
  );
};

export default Dashboard;
