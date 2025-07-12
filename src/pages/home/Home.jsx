import { Card, Col, Container, Row } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Footer from "../../components/footer/Footer";
import fetchApi from "../../store/server";
import useCourseStore from "../../store/courseDatas";
import useSearchStore from "../../store/searchStore";

const Home = () => {
  const navigator = useNavigate()
  const inputRef = useRef()
  const {wordSearch, setWordSearch} = useSearchStore()
  const fetchCourses = useCourseStore(state => state.fetchCourses)
  const loading = useCourseStore(state => state.loading)
  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])
  const courses = useCourseStore(state => state.courses)
  const searchCourseHandler = () => {
    setWordSearch((inputRef.current.value).toLowerCase())
    navigator('/courses')
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
    <>
      <header className="header">
        <MyNavbar />
        <Container className="d-flex justify-content-center align-items-center">
          <section className="container-header">
            <p>Welcome to the</p>
            <h1 className="title-site">Quf Learn</h1>
            <div className="search-course-container">
              <input
                ref={inputRef}
                className="search-course-input"
                type="text"
                placeholder="Search Course..."
              />
              <button onClick={searchCourseHandler} className="search-course-btn">
                <FaMagnifyingGlass />
              </button>
            </div>
          </section>
        </Container>
      </header>
      <div className="courses-list">
        <Container>
          <Row>
            <section className="about-section">
              <Container>
                <h2>Why Quf Learn?</h2>
                <p>
                  Quf Learn is a modern, project-based learning platform focused
                  on teaching frontend technologies with a real-world approach.
                  From JavaScript to Next.js, our goal is to help you become a
                  job-ready developer.
                </p>
              </Container>
            </section>
            <h2 className="training-courses-list"> Training courses : </h2>
            {courses.map((course) => {
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
                        <Link className="link-course" to={`/courses/${course.id}`}>
                      <button className="btn-course">
                          course info
                      </button>
                        </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <Footer/>
    </>
  )
}
};

export default Home;
