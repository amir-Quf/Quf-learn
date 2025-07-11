import { Card, Col, Row } from "react-bootstrap";
import "./UserCourses.css";
import fetchApi from "../../../store/server";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { useCallback, useEffect, useState } from "react";
import useCourseStore from "../../../store/courseDatas";

const UserCourses = () => {
  const { courses } = useCourseStore();
  const userID = useAuthStore((s) => s.user.id);
  const userCourses = useAuthStore((s) => s.user.enrolledUser);
  const [allCoursesUser, setAllCoursesUser] = useState([]);
  useEffect(() => {
    if (!userCourses || !courses || courses.length === 0) return;

    const filtered = courses.filter((course) =>
      userCourses.includes(Number(course.id))
    );
    setAllCoursesUser(filtered);
  }, [courses, userCourses]);
  console.log(allCoursesUser);
  return (
    <Row className="mt-xxl-5 user-courses">
      <h2>Your Courses : </h2>
      {userCourses ? (
        allCoursesUser.map((course) => {
          return (
            <Col key={course.id} className="course-container" xl={3} lg={4} md={6} sm={12}>
              <Card className="course-card">
                <Card.Img variant="top" src={course.img} />
                <Card.Body>
                  <Card.Title className="about-course">
                    {course.title}
                  </Card.Title>
                    <p className="title-course-details">duration : {course.time}</p>
                    <p className="title-course-details">prerequisites : {course.prerequisites}</p>
                    <p className="title-course-details">courseStatus : {course.courseStatus}</p>  
                    <span className="title-course-details">about :</span> <p className="about-course">{course.desc}</p>
                  <Link className="link-course" to={`/courses/${course.id}`}>
                    <button className="btn-course">course info</button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <p>you have not a taken any course</p>
      )}
    </Row>
  );
};

export default UserCourses;
