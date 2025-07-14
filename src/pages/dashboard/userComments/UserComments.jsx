import { Col, Row } from 'react-bootstrap'
import './UserComments.css'
import useCourseStore from '../../../store/courseDatas'
import { useEffect, useState } from 'react'
import useAuthStore from '../../../store/authStore'
import commentImg from '../../../assets/images/comment-image.png'
import { motion } from 'motion/react'
const UserComments = () => {
  const {courses} = useCourseStore()
  const [commentsUser, setCommentsUser] = useState([])
  const {user} = useAuthStore()
  useEffect(() => {
    const findComments = courses.map((course) => {
      return course.comments.filter((comment) => {
        return comment.email === user.email
      })
    })
    setCommentsUser(findComments)
    console.log(!!commentsUser.length)
  },[courses,user])
  console.log(!!commentsUser.length)
  console.log(commentsUser.length)
  return (
    <motion.div whileHover={{scale: 1.1}} className=' row comment-user-container'>
      <Col sm={12}>
      <h2>your comments : </h2>
      </Col>
      <Col>
      {courses.comment ? (commentsUser.map(comment => {
        return(
          <motion.div whileHover={{scale: 1.1}} className="containers comment">
                      <div className="comment-title">
                        <img loading="lazy" src={commentImg} alt="Comment Setter" />
                        <h6>{comment.name}</h6>
                      </div>
                      <span>{comment.date}</span>
                      <p>{comment.email}</p>
                      <p>{comment.comment}</p>
                      {comment.responses.map((res) => {
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
                        )
                      })}
                    </motion.div>
                  )
}))
       : <div className='not-fond-comment'>
         <p>you have not posted any comments</p>
        </div>}
      </Col>
    </motion.div>
  )
}

export default UserComments
