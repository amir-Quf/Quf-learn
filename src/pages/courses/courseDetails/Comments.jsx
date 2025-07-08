import { Col } from "react-bootstrap";
import useCourseStore from "../../../store/courseDatas";
import { useMemo } from "react";
import commentImg from '../../../assets/images/comment-image.png'
import { PiArrowBendDoubleUpLeftFill } from "react-icons/pi";
const Comments = ({courseID}) => {
  const getCourseById = useCourseStore(state => state.getCourseById)
  const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
  return (
    <Col>
      {course.comments.map((commentDetails) => {
        return (
          <div className="containers comment">
            <div className="comment-title">
              <img src={commentImg} alt="Comment Setter" />
              <h6>{commentDetails.name}</h6>
            </div>
            <span>{commentDetails.date}</span>
            <p>{commentDetails.email}</p>
            <p>{commentDetails.comment}</p>
            {commentDetails.responses.map((res) => {
              return (
                <div className="response-comment-container">
                  <PiArrowBendDoubleUpLeftFill />
                  <div className="responses-comment">
                    <div className="response-comment-title">
                      <img src={course.teacher.img} alt="responser" />
                      <h6>{res.name}</h6>
                    </div>
                    <span>{res.date}</span>
                    <p>{res.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )
      })}
    </Col>
  );
};

export default Comments;
