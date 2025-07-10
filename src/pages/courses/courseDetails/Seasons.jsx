import React, { memo, useEffect, useMemo, useState } from "react";
import useCourseStore from "../../../store/courseDatas";
import { Accordion } from "react-bootstrap";
import { IoMdPlayCircle } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import useAuthStore from "../../../store/authStore";
const Seasons = ({courseID}) => {
    const getCourseById = useCourseStore(state => state.getCourseById)
    const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
    const userCourses = useAuthStore((s) => s.user.enrolledUser)
    const [isRegisterUser , setIsRegisterUser] = useState(false)
     useEffect(() => {
           setIsRegisterUser(userCourses.includes(Number(courseID)))
        },[userCourses, courseID])
  return (
    <div className="containers education-container">
      <h4>Seasons : </h4>
      {course.seasons.map((season) => {
        return (
          <Accordion key={season.id} className="seasons-container">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{season.title}</Accordion.Header>
              <Accordion.Body>
                {season.sessions.map((session) => {
                  return (
                    <div aria-disabled={isRegisterUser} key={session.id} className="season-meeting-container">
                      <div className="season-meeting-title-box">
                       {isRegisterUser? <IoMdPlayCircle /> : <FaLock/>}
                        <h6>{session.title}</h6>
                      </div>
                      <p>{session.duration}</p>
                    </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
};

export default memo(Seasons);
