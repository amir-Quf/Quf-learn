import axios from 'axios'
import MyNavbar from '../../components/nav/Nav'
import './Courses.css'
import coursesList from '../../store/coursesList'

const Courses = () => {
  const clickhandler = () => {
    axios.post('http://localhost:3000/coursesList',coursesList)
    .then(res => console.log(res.data))
  }
  return (
    <div>
     <MyNavbar/>
     <h1 style={{margin: "80px"}}></h1>
     <button onClick={clickhandler}>change</button>
    </div>
  )
}

export default Courses
