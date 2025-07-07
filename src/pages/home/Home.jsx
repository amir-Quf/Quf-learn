import { Button, Card, Col, Container, Row } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import "./Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import coursesList from "../../store/coursesList";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const [courses, setCourses] = useState(coursesList);
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
                className="search-course-input"
                type="text"
                placeholder="Search Course..."
              />
              <button className="search-course-btn">
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
  );
};

export default Home;
