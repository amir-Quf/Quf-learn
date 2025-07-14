import { useFormik } from "formik";
import {registerSchemaComment} from "../../../utils/register";
import fetchApi from "../../../store/server";
import { useParams } from "react-router-dom";
import { memo, useMemo } from "react";
import useCourseStore from "../../../store/courseDatas";
import Swal from "sweetalert2";
import { motion } from "motion/react";
const SendComment = () => {
    const courseID = useParams().courseId;
    const {fetchCourses} = useCourseStore()
    const getCourseById = useCourseStore(state => state.getCourseById)
    const course = useMemo(() => getCourseById(courseID), [getCourseById, courseID])
    const form = useFormik({
    initialValues: { name: "", email: "", comment: "" },
    onSubmit: async (values, { setSubmitting, resetForm }, ) => {
        const newComment = {
        id: String(course.comments + 1),
        name: values.name,
        email: values.email,
        comment: values.comment,
        date: new Date().toISOString().split("T")[0],
        responses: []
        }
      try{
        await fetchApi.patch(`/coursesList/${courseID}`,{comments : [...course.comments, newComment]})
        Swal.fire({
            icon: 'success',
            title: 'your message was successfully send',
            showConfirmButton: false,
            timer: 1500,
        })
        resetForm()
        fetchCourses()
      } catch (err){
        console.log('error message', err)
        Swal.fire({
            icon: 'error',
            title: `error send comment : ${err}`,
            confirmButtonText: 'ok'
        })
      } finally {
        setSubmitting(false)
      }
    },
    validationSchema: registerSchemaComment,
  });
  return (
    <motion.div whileHover={{scale: 1.1}} className="col">
      <h3>Write a comment : </h3>
      <form
        className="containers send-comment-container"
        onSubmit={form.handleSubmit}
      >
        <label htmlFor="name">Please Enter Your Name : </label>
        <motion.input whileFocus={{scale: 1.1}}
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="name"
          type="text"
          placeholder="name..."
        />
        <p className="error-comment">
          {form.errors.name && form.touched.name && form.errors.name}
        </p>
        <label htmlFor="email">Please Enter Your Email : </label>
        <motion.input whileFocus={{scale: 1.1}}
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="email"
          type="email"
          placeholder="email"
        />
        <p className="error-comment">
          {form.errors.email && form.touched.email && form.errors.email}
        </p>
        <label htmlFor="comment">Please Enter Your Comment : </label>
        <motion.textarea whileFocus={{scale: 1.1}}
          value={form.values.comment}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="comment"
          placeholder="comment..."
        />
        <p className="error-comment">
          {form.errors.comment && form.touched.comment && form.errors.comment}
        </p>
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type="submit" disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...': 'Send Comment'}</motion.button>
      </form>
    </motion.div>
  );
};

export default memo(SendComment);
