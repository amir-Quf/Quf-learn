import "./CourseDetails.css";
import coursesList from "../../store/coursesList";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import Footer from "../../components/footer/Footer";
import { useFormik } from "formik";
import registerSchema from "../../utils/register";
import { IoMdPlayCircle } from "react-icons/io";
import { PiArrowBendDoubleUpLeftFill } from "react-icons/pi";
const CourseDetails = () => {
  const [courses, setCourses] = useState(coursesList);
  const courseID = useParams().courseId;
  const course = useMemo(() => courses.find((item) => item.id == courseID),[courses, courseID])

  const form = useFormik({
    initialValues: { name: "", email: "", comment: "" },
    onSubmit: (values, { setSubmitting }, e) => {
      e.preventDefault();
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    },
    validationSchema: registerSchema,
  });
  return (
    <div>
      <MyNavbar />
            <Container key={course.id} style={{ marginTop: "80px" }}>
              <Row className="course-Details-container">
                <Col lg={6} md={12}>
                  <div className="course-img-box">
                    <img
                      className="course-img-box__cover"
                      src={course.img}
                      alt={course.title}
                    />
                  </div>
                </Col>
                <Col className="about-title-course" lg={6} md={12}>
                  <h2>
                    Course Name : <h4>{course.title}</h4>
                  </h2>
                  <p>
                    {" "}
                    About Course : <span>{course.desc}</span>
                  </p>
                  <div className="buy-course">
                    <div className="price-course">
                      <p>Price :</p>
                      {!course.price ? (
                        <p className="price-of-course free">free</p>
                      ) : course.discount ? (
                        <div className="price-course">
                          <p className="price-before-discount">
                            {course.price}
                          </p>
                          <p className="price-of-course">
                            ${course.price - course.discount}
                          </p>
                        </div>
                      ) : (
                        <p className="price-of-course">${course.price}</p>
                      )}
                    </div>
                    <button>
                      {" "}
                      Participate in the course <FaMoneyBillWave />
                    </button>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "40px" }}>
                <Col xl={3} md={4} sm={6}>
                  <div className="containers info-courses-details">
                    <IoMdTimer className="svgs" />
                    <div className="info-courses-details__info">
                      <p>Course duration : </p>
                      <span>{course.time}</span>
                    </div>
                  </div>
                </Col>
                <Col xl={3} md={4} sm={6}>
                  <div className="containers info-courses-details">
                    <MdOutlineDateRange className="svgs" />
                    <div className="info-courses-details__info">
                      <p>Last update date : </p>
                      <span>{course.lastUpdate}</span>
                    </div>
                  </div>
                </Col>
                <Col xl={3} md={4} sm={6}>
                  <div className="containers info-courses-details">
                    <FaLaptopCode className="svgs" />
                    <div className="info-courses-details__info">
                      <p>Prerequisites : </p>
                      <span>{course.prerequisites}</span>
                    </div>
                  </div>
                </Col>
                <Col xl={3} md={4} sm={6}>
                  <div className="containers info-courses-details">
                    <IoInformationCircleOutline className="svgs" />
                    <div className="info-courses-details__info">
                      <p>Course status : </p>
                      <span>{course.courseStatus}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="containers container-desc">
                    <h4>Description : </h4>
                    <p>{course.courseInfo}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="containers education-container">
                    <h4>Seasons : </h4>
                    <Accordion className="seasons-container">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Season 1</Accordion.Header>
                        <Accordion.Body>
                          <div className="season-meeting-container">
                            <div className="season-meeting-title-box">
                            <IoMdPlayCircle/>
                            <h6>Meeting name</h6>
                            </div>
                            <p>23:40</p>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <section className="teacher-course-box containers">
                    <img src="./" alt="teacher photo" />
                    <h3 className="teacher-name">Teacher : </h3>
                    <p>About Teacher : </p>
                    <Link to="">
                      <button className="info-teacher info-teacher">
                        Teacher Info
                      </button>
                    </Link>
                  </section>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>Write a comment : </h3>
                  <form
                    className="containers send-comment-container"
                    onSubmit={form.handleSubmit}
                  >
                    <label htmlFor="name">Please Enter Your Name : </label>
                    <input
                      value={form.values.name}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      name="name"
                      type="text"
                      placeholder="name..."
                    />
                    <p className="error-comment">
                      {form.errors.name &&
                        form.touched.name &&
                        form.errors.name}
                    </p>
                    <label htmlFor="email">Please Enter Your Email : </label>
                    <input
                      value={form.values.email}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      name="email"
                      type="email"
                      placeholder="email"
                    />
                    <p className="error-comment">
                      {form.errors.email &&
                        form.touched.email &&
                        form.errors.email}
                    </p>
                    <label htmlFor="comment">
                      Please Enter Your Comment :{" "}
                    </label>
                    <textarea
                      value={form.values.comment}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      name="comment"
                      placeholder="comment..."
                    />
                    <p className="error-comment">
                      {form.errors.comment &&
                        form.touched.comment &&
                        form.errors.comment}
                    </p>
                    <button>Send Comment</button>
                  </form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="containers comment">
                    <div className="comment-title">
                      <img src="" alt="Comment Setter" />
                      <h6>UserName</h6>
                    </div>
                    <span>Date</span>
                    <p>comment</p>
                    <div className="response-comment-container">
                    <PiArrowBendDoubleUpLeftFill/>
                      <div className="responses-comment">
                        <div className="response-comment-title">
                          <img src="" alt="responser" />
                          <h6>ResponserName</h6>
                        </div>
                        <span>Date</span>
                        <p>Response Comment</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
      <Footer />
    </div>
  );
};

export default CourseDetails;
