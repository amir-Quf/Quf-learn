import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import useCourseStore from "../../../store/courseDatas";
import { motion } from "motion/react";
const AboutTeacher = ({courseID}) => {
    const getCourseById = useCourseStore(state => state.getCourseById)
    const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
  return (
    <motion.section whileHover={{scale: 1.1}} className="teacher-course-box containers">
      <img loading="lazy" src={course.teacher.img} alt="teacher photo" />
      <h3 className="teacher-name">Teacher : {course.teacher.name}</h3>
      <p>About Teacher : {course.teacher.bio}</p>
      <Link to={`/`}>
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} className="info-teacher info-teacher">Teacher Info</motion.button>
      </Link>
    </motion.section>
  );
};

export default memo(AboutTeacher);
