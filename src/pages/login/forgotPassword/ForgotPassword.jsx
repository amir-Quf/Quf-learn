import { Container } from 'react-bootstrap'
import MyNavbar from '../../../components/nav/Nav'
import './ForgotPassword.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import fetchApi from '../../../store/server'
import Swal from 'sweetalert2'
import {registerSchemaForgotPassword} from '../../../utils/register'

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
      <Container className='container-login'>
        <form className='form-login' onSubmit={form.handleSubmit} bindsubmit="">
          <input value={form.values.email} onBlur={form.handleBlur} onChange={form.handleChange} name='email' type="email" placeholder='Enter your email...'/>
          <p className='error-input'>{form.errors.email && form.touched.email && form.errors.email}</p>
          <button type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'send password'}</button>
          <p>Don`t have an account ? <Link to='/register'> Register</Link> </p>
          <Link to='/login'>i have received my password</Link>
        </form>
      </Container>
    </div>
  )
}


export default ForgotPassword
