import { Container } from 'react-bootstrap'
import MyNavbar from '../../../components/nav/Nav'
import './AddCourse.css'
import { useFormik } from 'formik'
import useCourseStore from '../../../store/courseDatas'
import useAuthStore from '../../../store/authStore'
import fetchApi from '../../../store/server'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { registerSchemaAddNewCourse } from '../../../utils/register'
import PageWrapper from '../../../components/pageWrapper'
import { motion } from 'motion/react'
import HeadHelmet from '../../../components/HeadHelmet'
const AddCourse = () => {
  const { courses,fetchCourses } = useCourseStore()
  const { user, updateData } = useAuthStore()
  const navigator = useNavigate()
  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      price: '',
      discount: '',
      duration: '',
      prerequisites: '',
      info: '',
      img: '',
      status: '',
      seasons: [
        {
          title: '',
          sessions: [
            { title: '', duration: '' }
          ]
        }
      ]
    },
    onSubmit: async (values, {setSubmitting}) => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const date = now.getDate()

      const newCourse = {
        id: String(courses.length + 1),
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
          bio: user.desc
        },
        seasons: values.seasons,
        comments: [],
        students: []
      }

      const res = await fetchApi.post('/coursesList', newCourse)
      try{
        Swal.fire({
          title: 'the course was successFully added',
          icon: 'success',
        })
        fetchCourses()
        const updated = fetchApi.put(`/users/${user.id}`, {...user, courses: [...user.courses, Number(newCourse.id)]})
        try{
          updateData({...user, courses: [...user.courses, Number(newCourse.id)]})
        }catch (err) {
          
        }
        navigator('/admin')
      }catch (err) {
        Swal.fire({
          title: 'there was an error adding the course',
          icon: 'error',
        })
      } finally{
        setSubmitting(false)
      }

    },
    validationSchema : registerSchemaAddNewCourse,
  })

  const addSeason = () => {
    const newSeasons = [...formik.values.seasons]
    newSeasons.push({
      title: '',
      sessions: [{ title: '', duration: '' }]
    })
    formik.setFieldValue('seasons', newSeasons)
  }

  const addSession = (seasonIndex) => {
    const newSeasons = [...formik.values.seasons]
    newSeasons[seasonIndex].sessions.push({ title: '', duration: '' })
    formik.setFieldValue('seasons', newSeasons)
  }

  return (
    <PageWrapper>
      <HeadHelmet title='add-course' desc='add new course to QufLearn site'/>
      <MyNavbar />
      <Container style={{ marginTop: '80px' }}>
        <motion.form initial={{scale: 0.9}} whileHover={{scale:1}} className="add-course-form" onSubmit={formik.handleSubmit}>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="title" placeholder="Course Title" value={formik.values.title} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.title && formik.touched.title && formik.errors.title}</p>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="desc" placeholder="Course Description" value={formik.values.desc} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.desc && formik.touched.desc && formik.errors.desc}</p>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="price" placeholder="Price" type="number" value={formik.values.price} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.price && formik.touched.price && formik.errors.price}</p>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="discount" placeholder="Discount" type="number" value={formik.values.discount} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.discount && formik.touched.discount && formik.errors.discount}</p>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="duration" placeholder="Duration" value={formik.values.duration} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.duration && formik.touched.duration && formik.errors.duration}</p>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="prerequisites" placeholder="Prerequisites" value={formik.values.prerequisites} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.prerequisites && formik.touched.prerequisites && formik.errors.prerequisites}</p>
          <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="img" placeholder="Image URL" value={formik.values.img} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.img && formik.touched.img && formik.errors.img}</p>
          <motion.textarea whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="info" placeholder="More Info" value={formik.values.info} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
          <p className='error-input'>{formik.errors.info && formik.touched.info && formik.errors.info}</p>

          <motion.select whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}} name="status" value={formik.values.status} onChange={formik.handleChange} className='dropdown-status-course' onBlur={formik.handleBlur}>
            <option value="" disabled>Select Status</option>
            <option value="Completed">Completed</option>
            <option value="In holding">In holding</option>
          </motion.select>
          <p className='error-input'>{formik.errors.status && formik.touched.status && formik.errors.status}</p>

          {formik.values.seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="seasons-course">
              <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
                type="text"
                placeholder={`Season ${seasonIndex + 1} Title`}
                value={season.title}
                onChange={(e) => {
                  const newSeasons = [...formik.values.seasons]
                  newSeasons[seasonIndex].title = e.target.value
                  formik.setFieldValue('seasons', newSeasons)
                }}
              />
               {formik.errors.seasons?.[seasonIndex]?.title && formik.touched.seasons?.[seasonIndex]?.title && (<p className='error-input'>{formik.errors.seasons[seasonIndex].title}</p>)}

              {season.sessions.map((session, sessionIndex) => (
                <div key={sessionIndex} className="session-course">
                  <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
                    type="text"
                    placeholder={`Session ${sessionIndex + 1} Title`}
                    value={session.title}
                    onChange={(e) => {
                      const newSeasons = [...formik.values.seasons]
                      newSeasons[seasonIndex].sessions[sessionIndex].title = e.target.value
                      formik.setFieldValue('seasons', newSeasons)
                    }}
                  />
                  {formik.errors.seasons?.[seasonIndex]?.sessions?.[sessionIndex]?.title &&
                  formik.touched.seasons?.[seasonIndex]?.sessions?.[sessionIndex]?.title && (
                  <p className='error-input'>{formik.errors.seasons[seasonIndex].sessions[sessionIndex].title}</p>)}
                  <motion.input whileTap={{scale: 0.95}} whileFocus={{scale: 1.1}}
                    type="text"
                    placeholder={`Session ${sessionIndex + 1} Duration`}
                    value={session.duration}
                    onChange={(e) => {
                      const newSeasons = [...formik.values.seasons]
                      newSeasons[seasonIndex].sessions[sessionIndex].duration = e.target.value
                      formik.setFieldValue('seasons', newSeasons)
                    }}
                  />
                  {formik.errors.seasons?.[seasonIndex]?.sessions?.[sessionIndex]?.duration &&
                  formik.touched.seasons?.[seasonIndex]?.sessions?.[sessionIndex]?.duration && (
                  <p className='error-input'>{formik.errors.seasons[seasonIndex].sessions[sessionIndex].duration}</p>)}
                </div>
              ))}

              <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type="button" onClick={() => addSession(seasonIndex)} className="add-course-season" disabled={formik.isSubmitting}>{formik.isSubmitting ? 'adding...' : '+ Add Session'}</motion.button>
            </div>
          ))}

          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type="button" onClick={addSeason} className="add-course-season">+ Add Season</motion.button>

          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type="submit" className="add-course-btn">Add Course</motion.button>
        </motion.form>
      </Container>
    </PageWrapper>
  )
}

export default AddCourse
