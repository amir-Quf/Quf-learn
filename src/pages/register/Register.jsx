import './Register.css'
import { Container } from 'react-bootstrap'
import MyNavbar from '../../components/nav/Nav'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import fetchApi from '../../store/server'
import Swal from 'sweetalert2'
import { registerSchemaUser } from '../../utils/register'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import useAuthStore from '../../store/authStore'
import { motion } from 'motion/react' 
import HeadHelmet from '../../components/HeadHelmet'
const Register = () => {
  const navigator = useNavigate()
  const { hiddenPassword, changeHiddenPassword} = useAuthStore()
  const {changeConfirmHiddenPassword, confirmHiddenPassword} = useAuthStore()
  const form = useFormik({
    initialValues: {username:'',email: '', password: '',confirmPassword: ''},
    onSubmit: async (values, {resetForm, setSubmitting}) => {
      const newUser = {
        username: values.name,
        email: values.email,
        password: values.password,
        role: 'user',
        desc: '',
        enrolledUser: [],
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
      <HeadHelmet title='sing In' desc='sing in to QufLearn site'/>
      <MyNavbar/>
        <div className="container-login-page">
      <Container className='container-login'>
        <motion.form whileHover={{scale: 1.1}} className='form-login' onSubmit={form.handleSubmit}>
          <motion.input whileFocus={{scale: 1.1}} value={form.values.username} onBlur={form.handleBlur} onChange={form.handleChange} name='username' type="text" placeholder='Enter your username...'/>
          <p className='error-input'>{form.errors.username && form.touched.username && form.errors.username}</p>
          <motion.input whileFocus={{scale: 1.1}} value={form.values.email} onBlur={form.handleBlur} onChange={form.handleChange} name='email' type="text" placeholder='Enter your email...'/>
          <p className='error-input'>{form.errors.email && form.touched.email && form.errors.email}</p>
          <motion.div whileHover={{scale: 1.1}} className='password-container'>
                    <input value={form.values.password} onBlur={form.handleBlur} onChange={form.handleChange} name='password' type={hiddenPassword ? "password" : 'text'} placeholder='Enter your password...'/>
                    {hiddenPassword? <IoIosEyeOff onClick={() => changeHiddenPassword()} /> : <IoIosEye onClick={() => changeHiddenPassword()} />}
                  </motion.div>
          <p className='error-input'>{form.errors.password && form.touched.password && form.errors.password}</p>
          <motion.div whileHover={{scale: 1.1}} className='password-container'>
          <input value={form.values.confirmPassword} onBlur={form.handleBlur} onChange={form.handleChange} name='confirmPassword' type={confirmHiddenPassword ? "password" : 'text'} placeholder='Enter your password...'/>
          {confirmHiddenPassword? <IoIosEyeOff onClick={() => changeConfirmHiddenPassword()} /> : <IoIosEye onClick={() => changeConfirmHiddenPassword()} />}
        </motion.div>
          <p className='error-input'>{form.errors.confirmPassword && form.touched.confirmPassword && form.errors.confirmPassword}</p>
          <motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.1}} type='submit' disabled={form.isSubmitting}>{form.isSubmitting ? 'sending...' : 'sing Up'}</motion.button>
          <p>you have an account ? <motion.a whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} href='/login'> login</motion.a> </p>
        </motion.form>
      </Container>
        </div>
    </div>
  )
}

export default Register

