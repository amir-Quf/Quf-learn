import { Container } from 'react-bootstrap'
import MyNavbar from '../../components/nav/Nav'
import './Login.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import fetchApi from '../../store/server'
import Swal from 'sweetalert2'
import registerSchema from '../../utils/register'

const Login = () => {
  const navigator = useNavigate()
  const form = useFormik({
    initialValues: {username:'', password: ''},
    onSubmit: async (values, {resetForm, setSubmitting}) => {
      const loginUser = {
        username: values.username,
        password: values.password,
      }
      try{
        await fetchApi.get(`/users?username==${username}`)
        .then(res => {
          navigator('/')
        })
        resetForm()
      } catch (err){
        Swal.fire({
          title: 'userName or password wrong',
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
        <form className='form-login' onSubmit={form.handleSubmit}>
          <input value={form.values.username} onBlur={form.handleBlur} onChange={form.handleChange} name='username' type="text" placeholder='Enter your username or email...'/>
          <p>{form.errors.username && form.touched.username && form.errors.username}</p>
          <input value={form.values.password} onBlur={form.handleBlur} onChange={form.handleChange} name='password' type="password" placeholder='Enter your password...'/>
          <p>{form.errors.password && form.touched.password && form.errors.password}</p>
          <button type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'Login'}</button>
          <p>Don`t have an account ? <Link to='/register'> Register</Link> </p>
          <Link to='/login/forgot-password'>forgot a password</Link>
        </form>
      </Container>
    </div>
  )
}

export default Login
