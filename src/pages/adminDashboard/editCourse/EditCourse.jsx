import { useParams } from "react-router-dom";
import "./EditCourse.css";
import { Container } from "react-bootstrap";
import MyNavbar from "../../../components/nav/Nav";
import { useFormik } from "formik";
import useCourseStore from "../../../store/courseDatas";
import useAuthStore from "../../../store/authStore";
import fetchApi from "../../../store/server";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registerSchemaAddNewCourse } from "../../../utils/register";
import { memo, useEffect, useState } from "react";
import PageWrapper from "../../../components/pageWrapper";
import { motion } from "motion/react";
import HeadHelmet from "../../../components/HeadHelmet";
const EditCourse = () => {
  const courseID = useParams().courseId;
  const [initialValues, setInitialValues] = useState(null);
  useEffect(() => {
    fetchApi
      .get(`/coursesList/${Number(courseID)}`)
      .then((res) => {
        const course = res.data;
        setInitialValues({
            id: course.id || "",
          title: course.title || "",
          desc: course.desc || "",
          price: course.price || "",
          discount: course.discount || "",
          duration: course.time || "",
          prerequisites: course.prerequisites || "",
          info: course.courseInfo || "",
          img: course.img || "",
          status: course.courseStatus || "",
          seasons: course.seasons || [
            {
              title: "",
              sessions: [{ title: "", duration: "" }],
            },
          ],
          comments: course.comments || [],
          students: course.students || [],
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "data not received, please try again",
          icon: "error",
        });
      });
  }, [courseID]);

  const { fetchCourses } = useCourseStore();
  const { user } = useAuthStore();
  const navigator = useNavigate();
  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      desc: "",
      price: "",
      discount: "",
      duration: "",
      prerequisites: "",
      info: "",
      img: "",
      status: "",
      seasons: [
        {
          title: "",
          sessions: [{ title: "", duration: "" }],
        },
      ],
    },
    onSubmit: async (values, { setSubmitting }) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();

      const newCourse = {
        id: initialValues.id,
        title: values.title,
        desc: values.desc,
        price: values.price,
        discount: values.discount,
        time: values.duration,
        lastUpdate: `${year}/${month}/${date}`,
        prerequisites: values.prerequisites,
        courseStatus: values.status,
        courseInfo: values.info,
        img: values.img,
        teacher: {
          name: user.username,
          img: user.img,
          bio: user.desc,
        },
        seasons: values.seasons,
        comments: initialValues.comments,
        students: initialValues.students,
      };

      const res = await fetchApi.put(`/coursesList/${courseID}`, newCourse);
      try {
        Swal.fire({
          title: "the course was successFully edited",
          icon: "success",
        });
        fetchCourses();
        navigator("/admin");
    } catch (err) {
        Swal.fire({
            title: "there was an error editing the course",
            icon: "error",
        });
    } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
    validationSchema: registerSchemaAddNewCourse,
  })
  
  const addSeason = () => {
    const newSeasons = [...formik.values.seasons];
    newSeasons.push({
        title: "",
      sessions: [{ title: "", duration: "" }],
    });
    formik.setFieldValue("seasons", newSeasons);
}

const addSession = (seasonIndex) => {
    const newSeasons = [...formik.values.seasons];
    newSeasons[seasonIndex].sessions.push({ title: "", duration: "" });
    formik.setFieldValue("seasons", newSeasons);
};

const deleteCourseHandler = () => {
    Swal.fire({
        title: 'do you want to delete this courser?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
    }).then(res => {
        if(res.isConfirmed) {
            fetchApi.delete(`/coursesList/${courseID}`)
            try{
                Swal.fire({
                    title: 'course successfully deleted',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                })
                fetchCourses();
                navigator('/admin')
            }catch (err) {
                Swal.fire({
                    title: 'course deletion was not successful',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }
    })
  }

  if (!initialValues) {
    return (
      <div className="container-loader">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <PageWrapper>
      <HeadHelmet title='edit-course' desc='edit-course at QufLearn site'/>
        <MyNavbar />
        <Container style={{ marginTop: "80px" }}>
          <motion.form initial={{scale: 0.9}} whileHover={{scale: 1}} className="edit-course-form" onSubmit={formik.handleSubmit}>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="title"
              placeholder="Course Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.title &&
                formik.touched.title &&
                formik.errors.title}
            </p>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="desc"
              placeholder="Course Description"
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.desc && formik.touched.desc && formik.errors.desc}
            </p>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="price"
              placeholder="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.price &&
                formik.touched.price &&
                formik.errors.price}
            </p>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="discount"
              placeholder="Discount"
              type="number"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.discount &&
                formik.touched.discount &&
                formik.errors.discount}
            </p>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="duration"
              placeholder="Duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.duration &&
                formik.touched.duration &&
                formik.errors.duration}
            </p>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="prerequisites"
              placeholder="Prerequisites"
              value={formik.values.prerequisites}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.prerequisites &&
                formik.touched.prerequisites &&
                formik.errors.prerequisites}
            </p>
            <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="img"
              placeholder="Image URL"
              value={formik.values.img}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.img && formik.touched.img && formik.errors.img}
            </p>
            <motion.textarea whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="info"
              placeholder="More Info"
              value={formik.values.info}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="error-input">
              {formik.errors.info && formik.touched.info && formik.errors.info}
            </p>

            <motion.select whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="dropdown-status-course"
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Completed">Completed</option>
              <option value="In holding">In holding</option>
            </motion.select>
            <p className="error-input">
              {formik.errors.status &&
                formik.touched.status &&
                formik.errors.status}
            </p>

            {formik.values.seasons.map((season, seasonIndex) => (
              <div key={seasonIndex} className="seasons-course">
                <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
                  type="text"
                  placeholder={`Season ${seasonIndex + 1} Title`}
                  value={season.title}
                  onChange={(e) => {
                    const newSeasons = [...formik.values.seasons];
                    newSeasons[seasonIndex].title = e.target.value;
                    formik.setFieldValue("seasons", newSeasons);
                  }}
                />
                {formik.errors.seasons?.[seasonIndex]?.title &&
                  formik.touched.seasons?.[seasonIndex]?.title && (
                    <p className="error-input">
                      {formik.errors.seasons[seasonIndex].title}
                    </p>
                  )}

                {season.sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="session-course">
                    <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
                      type="text"
                      placeholder={`Session ${sessionIndex + 1} Title`}
                      value={session.title}
                      onChange={(e) => {
                        const newSeasons = [...formik.values.seasons];
                        newSeasons[seasonIndex].sessions[sessionIndex].title =
                          e.target.value;
                        formik.setFieldValue("seasons", newSeasons);
                      }}
                    />
                    {formik.errors.seasons?.[seasonIndex]?.sessions?.[
                      sessionIndex
                    ]?.title &&
                      formik.touched.seasons?.[seasonIndex]?.sessions?.[
                        sessionIndex
                      ]?.title && (
                        <p className="error-input">
                          {
                            formik.errors.seasons[seasonIndex].sessions[
                              sessionIndex
                            ].title
                          }
                        </p>
                      )}
                    <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
                      type="text"
                      placeholder={`Session ${sessionIndex + 1} Duration`}
                      value={session.duration}
                      onChange={(e) => {
                        const newSeasons = [...formik.values.seasons];
                        newSeasons[seasonIndex].sessions[
                          sessionIndex
                        ].duration = e.target.value;
                        formik.setFieldValue("seasons", newSeasons);
                      }}
                    />
                    {formik.errors.seasons?.[seasonIndex]?.sessions?.[
                      sessionIndex
                    ]?.duration &&
                      formik.touched.seasons?.[seasonIndex]?.sessions?.[
                        sessionIndex
                      ]?.duration && (
                        <p className="error-input">
                          {
                            formik.errors.seasons[seasonIndex].sessions[
                              sessionIndex
                            ].duration
                          }
                        </p>
                      )}
                  </div>
                ))}

                <motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.1}}
                  type="button"
                  onClick={() => addSession(seasonIndex)}
                  className="edit-course-season"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "adding..." : "+ add Session"}
                </motion.button>
              </div>
            ))}

            <motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.1}}
              type="button"
              onClick={addSeason}
              className="edit-course-season"
            >
              + Add Season
            </motion.button>

            <div className="crud-btns">
                <motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.1}} type="submit" className="edit-course-btn">Edit Course</motion.button>
                <motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.1}} type="button" className="delete-course-btn" onClick={deleteCourseHandler}>Delete Course</motion.button>
            </div>
          </motion.form>
        </Container>
      </PageWrapper>
    );
  }
};

export default memo(EditCourse);
