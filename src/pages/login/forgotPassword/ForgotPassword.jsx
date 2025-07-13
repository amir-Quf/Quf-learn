import { Container } from 'react-bootstrap'
import MyNavbar from '../../../components/nav/Nav'
import './ForgotPassword.css'
import { useFormik } from 'formik'
import fetchApi from '../../../store/server'
import Swal from 'sweetalert2'
import {registerSchemaForgotPassword} from '../../../utils/register'
import { motion } from 'motion/react'
const ForgotPassword = () => {
  const form = useFormik({
    initialValues: {email:''},
    onSubmit: async (values, {resetForm, setSubmitting}) => {
      try{
        const res = await fetchApi.get('/users')
        const users = res.data
        const findUser = users.find(user => user.email == values.email)
        if(findUser){
          Swal.fire({
            title: `your password : ${findUser.password}`,
            icon: 'success',
          })
        } else {
          Swal.fire({
            title: 'not found user whit this email',
            icon: 'error',
            timer: 1500,
          showConfirmButton: false
          })
        }
        resetForm()
      } catch (err){
        Swal.fire({
          title: 'email is wrong',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        })
        resetForm()
      } finally {
        setSubmitting(false)
      }
    },
    validationSchema: registerSchemaForgotPassword,
  })
  return (
    <div>
      <MyNavbar/>
      <div className="container-login-page">
      <Container className='container-login'>
        <motion.form whileHover={{scale: 1.1}} className='form-login' onSubmit={form.handleSubmit} bindsubmit="">
          <motion.input whileFocus={{scale: 1.1}} value={form.values.email} onBlur={form.handleBlur} onChange={form.handleChange} name='email' type="email" placeholder='Enter your email...'/>
          <p className='error-input'>{form.errors.email && form.touched.email && form.errors.email}</p>
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'send password'}</motion.button>
          <p>Don`t have an account ? <motion.a whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} href='/register'> Register</motion.a> </p>
          <motion.a whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} href='/login'>i have received my password</motion.a>
        </motion.form>
      </Container>
      </div>
    </div>
  )
}


export default ForgotPassword
