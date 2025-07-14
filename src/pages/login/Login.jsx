import { Container } from 'react-bootstrap'
import MyNavbar from '../../components/nav/Nav'
import './Login.css'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import fetchApi from '../../store/server'
import Swal from 'sweetalert2'
import {registerSchemaLogin} from '../../utils/register'
import useAuthStore from '../../store/authStore'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { motion } from 'motion/react'
import HeadHelmet from '../../components/HeadHelmet'
const Login = () => {
  const navigator = useNavigate()
  const login = useAuthStore(s => s.login)
  const { hiddenPassword, changeHiddenPassword} = useAuthStore()
  const form = useFormik({
    initialValues: {username:'', password: ''},
    onSubmit: async (values, {resetForm, setSubmitting}) => {
      const loginUser = {
        username: values.username,
        password: values.password,
      }
      try{
        const res = await fetchApi.get('/users')
        const users = res.data
        const findUser = users.find(user => {
        return ((user.username==loginUser.username ||
          user.email == loginUser.username)&&
        user.password==loginUser.password)
      })
        if(findUser){
          login(findUser)
          Swal.fire({
            title: 'Login was successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          navigator('/')
        }else {
          Swal.fire({
            title: 'userName or password wrong',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
          })
          
        }
        resetForm()
      } catch (err){
        Swal.fire({
            title: 'error to get data at dataBase',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
          })
        
      } finally {
        setSubmitting(false)
      }
    },
    validationSchema: registerSchemaLogin,
  })
  return (
    <div>
      <HeadHelmet title='login' desc='login to QufLearn site'/>
      <MyNavbar/>
      <div className="container-login-page">
      <Container className='container-login'>
        <motion.form whileHover={{scale: 1.1}} className='form-login' onSubmit={form.handleSubmit}>
          <motion.input whileFocus={{scale: 1.1}} value={form.values.username} onBlur={form.handleBlur} onChange={form.handleChange} name='username' type="text" placeholder='Enter your username or email...'/>
          <p className='error-input'>{form.errors.username && form.touched.username && form.errors.username}</p>
        <motion.div whileHover={{scale: 1.1}} className='password-container'>
          <input  value={form.values.password} onBlur={form.handleBlur} onChange={form.handleChange} name='password' type={hiddenPassword ? "password" : 'text'} placeholder='Enter your password...'/>
          {hiddenPassword? <IoIosEyeOff onClick={() => changeHiddenPassword()} /> : <IoIosEye onClick={() => changeHiddenPassword()} />}
        </motion.div>
          <p className='error-input'>{form.errors.password && form.touched.password && form.errors.password}</p>
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'Login'}</motion.button>
          <p>Don`t have an account ? <motion.a whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} href='/register'> Register</motion.a> </p>
          <motion.a whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} href='/login/forgot-password'>forgot a password</motion.a>
        </motion.form>
      </Container>
      </div>
    </div>
  )
}

export default Login
