import React, { useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import useCourseStore from '../../../store/courseDatas'
import { FaLaptopCode, FaMoneyBillWave } from 'react-icons/fa6'
import { MdOutlineDateRange } from 'react-icons/md'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { IoMdTimer } from 'react-icons/io'

const AboutCourse = ({courseID}) => {
    const getCourseById = useCourseStore(state => state.getCourseById)
    const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
  return (
    <Row>
      <Row className="course-Details-container">
                <Col lg={6} md={12}>
                  <div className="course-img-box">
                    <img className="course-img-box__cover" src={course.img} alt={course.title} />
                  </div>
                </Col>
                <Col className="about-title-course" lg={6} md={12}>
                <div className='title-course'>
                  <h2>
                    Course Name : 
                  </h2>
                  <p>{course.title}</p>
                </div>
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
    </Row>
  )
}

export default AboutCourse
