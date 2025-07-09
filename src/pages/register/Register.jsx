import './Register.css'
import { Container } from 'react-bootstrap'
import MyNavbar from '../../components/nav/Nav'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import fetchApi from '../../store/server'
import Swal from 'sweetalert2'
import { registerSchemaUser } from '../../utils/register'

const Register = () => {
  const navigator = useNavigate()
  const form = useFormik({
    initialValues: {username:'',email: '', password: '',confirmPassword: ''},
    onSubmit: async (values, {resetForm, setSubmitting}) => {
      const newUser = {
        username: values.name,
        email: values.email,
        password: values.password,
      }
      try{
        const isUserToDB = await fetchApi.get('/users')
        const isUsername = isUserToDB.find(user => user.username == values.username)
        const isEmail = isUserToDB.find(user => user.email == values.email)
        if(isUsername){
          Swal.fire({
            title: 'there is a user with this username',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }else if (isEmail){
          Swal.fire({
            title: 'there is a user with this email',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          const res = await fetchApi.post(`/users`, newUser)
            localStorage.setItem('user',JSON.stringify(res.data))
            Swal.fire({
              title: 'sing up was successfully',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          resetForm()
          navigator('/login')
        }
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
    validationSchema: registerSchemaUser,
  })
  return (
    <div>
      <MyNavbar/>
      <Container className='container-login'>
        <form className='form-login' onSubmit={form.handleSubmit}>
          <input value={form.values.username} onBlur={form.handleBlur} onChange={form.handleChange} name='username' type="text" placeholder='Enter your username...'/>
          <p>{form.errors.username && form.touched.username && form.errors.username}</p>
          <input value={form.values.email} onBlur={form.handleBlur} onChange={form.handleChange} name='email' type="text" placeholder='Enter your email...'/>
          <p>{form.errors.email && form.touched.email && form.errors.email}</p>
          <input value={form.values.password} onBlur={form.handleBlur} onChange={form.handleChange} name='password' type="password" placeholder='Enter your password...'/>
          <p>{form.errors.password && form.touched.password && form.errors.password}</p>
          <input value={form.values.confirmPassword} onBlur={form.handleBlur} onChange={form.handleChange} name='confirmPassword' type="password" placeholder='Enter confirm your password...'/>
          <p>{form.errors.confirmPassword && form.touched.confirmPassword && form.errors.confirmPassword}</p>
          <button type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'sing Up'}</button>
          <p>you have an account ? <Link to='/login'> login</Link> </p>
        </form>
      </Container>
    </div>
  )
}

export default Register

