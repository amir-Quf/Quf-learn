import axios from "axios";
import MyNavbar from "../../components/nav/Nav";
import "./Courses.css";
import useSearchStore from "../../store/searchStore";
import useCourseStore from "../../store/courseDatas";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PageWrapper from "../../components/pageWrapper";

const Courses = () => {
  const { wordSearch, setWordSearch } = useSearchStore();
  const inputRef = useRef()
  const { courses } = useCourseStore();
  const loading = useCourseStore(state => state.loading)
  const coursesList = courses.filter((course) => {
    return course.title.toLowerCase().includes(wordSearch);
  })
   const searchCourseHandler = () => {
    setWordSearch((inputRef.current.value).toLowerCase())
  }

  const keyDownHandler = (e) => {
    if(e.keyCode == 13){
      searchCourseHandler()
    }
  }

  if(loading){
    return(
      <div className="container-loader">
        <div className="loader">
        </div>
          <h1>Loading...</h1>
      </div>
    )
  }else{

  return (
    <PageWrapper>
      <MyNavbar />
      <Container style={{ marginTop: "80px" }}>
        <Row className="d-flex align-items-center justify-content-center">
          <div className="search-course-box">
            <input
            onKeyDown={keyDownHandler}
              ref={inputRef}
              defaultValue={wordSearch}
              className="search-course-inp"
              type="text"
              placeholder="Search Course..."
            />
            <button onClick={searchCourseHandler} className="search-course-btn">
              <FaMagnifyingGlass />
            </button>
          </div>
        </Row>
        <Row className="title-courses-searched">
          {coursesList.length ? <h2>Courses found with the word {wordSearch} : </h2> : ''}
        </Row>
        <Row className="courses-searched-container">
          {coursesList.length ? (
            coursesList.map((course) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={course.id}>
                  <Card className="course-card">
                    <Card.Img variant="top" src={course.img} />
                    <Card.Body>
                      <Card.Title className="title-course">
                        {course.title}
                      </Card.Title>
                      <Card.Text>
                        {" "}
                        price of course :{" "}
                        <span className="free-course">$ {course.price}</span>
                      </Card.Text>
                      <Link
                        className="link-course"
                        to={`/courses/${course.id}`}
                      >
                        <button className="btn-course">course info</button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p className="not-founded-course">course <span className="course-title-search">{wordSearch}</span> not found !</p>
          )}
          <div className="guidance-container">
            <p>To search, enter the name of the course you are looking for in the input field</p>
          </div>
        </Row>
      </Container>
    </PageWrapper>
  )}
};

export default Courses;
