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
            <Col className="course-container" xl={3} lg={4} md={6} sm={12}>
              <Card className="course-card">
                <Card.Img variant="top" src={course.img} />
                <Card.Body>
                  <Card.Title className="abut-course">
                    {course.title}
                  </Card.Title>
                  <Card.Text>
                    <span className="title-course-details">about :</span> <span className="abut-course">{course.desc}</span>
                  </Card.Text>
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
