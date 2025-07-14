import { Col } from "react-bootstrap";
import useCourseStore from "../../../store/courseDatas";
import { memo, useMemo, useRef, useState } from "react";
import commentImg from "../../../assets/images/comment-image.png";
import { PiArrowBendDoubleUpLeftFill } from "react-icons/pi";
import { motion } from "motion/react";
import useAuthStore from "../../../store/authStore";
import fetchApi from "../../../store/server";
import Swal from "sweetalert2";
const Comments = ({ courseID }) => {
  const inputRef = useRef();
  const { fetchCourses } = useCourseStore();
  const getCourseById = useCourseStore((state) => state.getCourseById);
  const { isAdmin } = useAuthStore();
  const { user } = useAuthStore();
  const course = useMemo(
    () => getCourseById(courseID),
    [getCourseById, courseID]
  );
  const [isAnswering, setIsAnswering] = useState(null);
  const answerHandler = (id) => {
    setIsAnswering(id);
  };
  const sendResponseHandler = (id) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const updatedComments = course.comments.map((comment) =>
      comment.id === id
        ? {
            ...comment,
            responses: [
              ...comment.responses,
              {
                id: comment.responses.length + 1,
                name: user.username,
                date: `${year}/${month}/${date}`,
                comment: inputRef.current.value,
              },
            ],
          }
        : comment
    );

    fetchApi
      .put(`/coursesList/${courseID}`, {
        ...course,
        comments: updatedComments
      })
      .then((res) => {
        Swal.fire({
          title: "response successFully sended",
          icon: "success",
        });
        fetchCourses();
      })
      .catch((err) => {
        Swal.fire({
          title: "failed to send reply",
          icon: "error",
        });
      });
  }
  return (
    <Col>
      {course.comments.map((commentDetails) => {
        return (
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={isAdmin() ? () => answerHandler(commentDetails.id) : ""}
            className="containers comment"
          >
            <div className="comment-title">
              <img loading="lazy" src={commentImg} alt="Comment Setter" />
              <h6>{commentDetails.name}</h6>
            </div>
            <span>{commentDetails.date}</span>
            <p>{commentDetails.email}</p>
            <p>{commentDetails.comment}</p>
            {isAnswering == commentDetails.id ? (
              <form className="form-send-response-comment">
                <motion.input
                  ref={inputRef}
                  whileFocus={{ scale: 1.1 }}
                  type="text"
                  required
                />
                <motion.button
                  type="submit"
                  onClick={() =>
                    sendResponseHandler(commentDetails.id)
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  send
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAnswering(null)}
                  className="cancel-response-comment"
                >
                  ×
                </motion.button>
              </form>
            ) : (
              ""
            )}
            {commentDetails.responses.map((res) => {
              return (
                <div className="response-comment-container">
                  <PiArrowBendDoubleUpLeftFill />
                  <div className="responses-comment">
                    <div className="response-comment-title">
                      <img loading="lazy" src={course.teacher.img} alt="responser" />
                      <h6>{res.name}</h6>
                    </div>
                    <span>{res.date}</span>
                    <p>{res.comment}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </Col>
  );
};

export default memo(Comments);
