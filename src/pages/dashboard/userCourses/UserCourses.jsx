import { Card, Col } from "react-bootstrap";
import "./UserCourses.css";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
import useCourseStore from "../../../store/courseDatas";
import { motion } from "motion/react";
const UserCourses = () => {
  const { courses } = useCourseStore();
  const userCourses = useAuthStore((s) => s.user.enrolledUser);
  const [allCoursesUser, setAllCoursesUser] = useState([]);
  useEffect(() => {
    if (!userCourses || !courses || courses.length === 0) return;

    const filtered = courses.filter((course) =>
      userCourses.includes(Number(course.id))
    );
    setAllCoursesUser(filtered)
  }, [courses, userCourses])
  return (
    <motion.div whileHover={{scale: 1.1}} className=" row mt-xxl-5 user-courses">
      <h2>Your Courses : </h2>
      {userCourses ? (
        allCoursesUser.map((course) => {
          return (
            <Col className="course-container" xl={3} lg={4} md={6} sm={12} whileHover={{scale: 1.1}} key={course.id} >
              <Link className="link-course" to={`/courses/${course.id}`}>
              <Card className="course-card">
                <Card.Img loading="lazy" variant="top" src={course.img} />
                <Card.Body>
                  <Card.Title className="about-course">
                    {course.title}
                  </Card.Title>
                    <p className="title-course-details">duration : {course.time}</p>
                    <p className="title-course-details">prerequisites : {course.prerequisites}</p>
                    <p className="title-course-details">courseStatus : {course.courseStatus}</p>  
                    <span className="title-course-details">about :</span> <p className="about-course">{course.desc}</p>
                    <motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.1}} className="btn-course">course info</motion.button>
                </Card.Body>
              </Card>
                  </Link>
            </Col>
          );
        })
      ) : (
        <p>you have not a taken any course</p>
      )}
    </motion.div>
  );
};

export default UserCourses;
