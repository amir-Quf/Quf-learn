import { useMemo } from "react";
import { Link } from "react-router-dom";
import useCourseStore from "../../../store/courseDatas";

const AboutTeacher = ({courseID}) => {
    const getCourseById = useCourseStore(state => state.getCourseById)
    const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
  return (
    <section className="teacher-course-box containers">
      <img src={course.teacher.img} alt="teacher photo" />
      <h3 className="teacher-name">Teacher : {course.teacher.name}</h3>
      <p>About Teacher : {course.teacher.bio}</p>
      <Link to={`/`}>
        <button className="info-teacher info-teacher">Teacher Info</button>
      </Link>
    </section>
  );
};

export default AboutTeacher;
