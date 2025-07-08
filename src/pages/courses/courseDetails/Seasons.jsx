import React, { useMemo } from "react";
import useCourseStore from "../../../store/courseDatas";
import { Accordion } from "react-bootstrap";
import { IoMdPlayCircle } from "react-icons/io";
const Seasons = ({courseID}) => {
    const getCourseById = useCourseStore(state => state.getCourseById)
    const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
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
                    <div key={session.id} className="season-meeting-container">
                      <div className="season-meeting-title-box">
                        <IoMdPlayCircle />
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

export default Seasons;
