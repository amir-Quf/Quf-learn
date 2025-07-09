import "./CourseDetails.css";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import MyNavbar from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";
import useCourseStore from "../../../store/courseDatas";
import SendComment from "./SendComment";
import Comments from "./Comments";
import AboutTeacher from "./AboutTeacher";
import Seasons from "./Seasons";
import AboutCourse from "./AboutCourse";
const CourseDetails = () => {
  const courseID = useParams().courseId;
  const getCourseById = useCourseStore(state => state.getCourseById)
  const loading = useCourseStore(state => state.loading)
  const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
  
  if(loading || !course){
    return (
      <div className="container-loader">
      <div className="loader">
      </div>
        <h1>loading...</h1>
      </div>
    )
  }else{
  
  return (
    <div>
      <MyNavbar />
            <Container style={{ marginTop: "80px" }}>
              <AboutCourse courseID={courseID}/>
              <Row>
                <Col>
                  <Seasons courseID={courseID}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <AboutTeacher courseID={courseID}/>
                </Col>
              </Row>
              <Row>
                <SendComment/>
              </Row>
              <Row>
                <Comments courseID={courseID}/>
              </Row>
            </Container>
      <Footer />
    </div>
  )
}
};

export default CourseDetails;
