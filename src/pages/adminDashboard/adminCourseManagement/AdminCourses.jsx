import { Card, Col, Row } from "react-bootstrap";
import "./AdminCourses.css";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
import useCourseStore from "../../../store/courseDatas";
import fetchApi from "../../../store/server";

const AdminCourses = () => {
  const { courses } = useCourseStore();
  const userCourses = useAuthStore((s) => s.user.courses);
  const [allCoursesUser, setAllCoursesUser] = useState([]);
  
  useEffect(() => {
    if (!userCourses || !courses || courses.length === 0) return;

    const filtered = courses.filter((course) =>
      userCourses.includes(Number(course.id) || course.id)
    );
    setAllCoursesUser(filtered);
  }, [courses, userCourses]);
  return (
    <Row className="admin-courses">
      <Col sm={12} className="add-course-box">
      <h2>Your Courses : </h2>
      <Link to='/admin/add-course'>
      <button>Add-Course</button>
      </Link>
      </Col>
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
                    <p className="title-course-details">courseStatus : {course.courseStatus}</p>
                    <p className="title-course-details">Students : {(course.students).length}</p>
                    <span className="title-course-details">about :</span> <p className="about-course">{course.desc}</p>
                  <Link className="link-course" to={`/admin/edit-course/${course.id}`}>
                    <button className="btn-course">Edit Course</button>
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

export default AdminCourses;
