import { Container } from 'react-bootstrap'
import MyNavbar from '../../../components/nav/Nav'
import './ForgotPassword.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import fetchApi from '../../../store/server'
import Swal from 'sweetalert2'
import registerSchema from '../../../utils/register'

const ForgotPassword = () => {
  const navigator = useNavigate()
  const form = useFormik({
    initialValues: {email:''},
    onSubmit: async (values, {resetForm, setSubmitting}) => {
      const loginUser = {
        email: values.email,
      }
      try{
        await fetchApi.get(`/users?email==${email}`)
        .then(res => {
          Swal.fire({
            title: 'new password sended to your email',
            icon: 'success',
          })
        })
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
    validationSchema: registerSchema,
  })
  return (
    <div>
      <MyNavbar/>
      <Container className='container-login'>
        <form className='form-login' bindsubmit="">
          <input value={form.values.email} onBlur={form.handleBlur} onChange={form.handleChange} name='email' type="email" placeholder='Enter your email...'/>
          <p>{form.errors.email && form.touched.email && form.errors.email}</p>
          <button type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'send password'}</button>
          <p>Don`t have an account ? <Link to='/register'> Register</Link> </p>
          <Link to='/login'>i have received my password</Link>
        </form>
      </Container>
    </div>
  )
}


export default ForgotPassword
