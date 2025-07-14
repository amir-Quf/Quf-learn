import './AdminProfile.css'
import { Col } from "react-bootstrap";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import { registerSchemaReDataUser } from "../../../utils/register";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fetchApi from "../../../store/server";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
import { motion } from 'motion/react';
const AdminProfile = () => {
  const {user} = useAuthStore()
    const userID = useAuthStore((s) => s.user.id);
  const [oldUserData, setOldUserData] = useState({});
  useEffect(() => {
    fetchApi.get(`/users/${userID}`).then((res) => {
      return setOldUserData(res.data);
    });
  }, [userID]);
  const navigator = useNavigate();
  const {changeHiddenPassword, hiddenPassword, logout} = useAuthStore()
  const form = useFormik({
    initialValues: {
      username: oldUserData.username || "",
      password: oldUserData.password || "",
      email: oldUserData.email || "",
      desc: oldUserData.desc || "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const newDatasUser = {
        username: values.username,
        password: values.password,
        email: values.email,
        desc: values.desc
      };
      try {
        await fetchApi.put(`/users/${userID}`, newDatasUser);
        Swal.fire({
          title: "your profile updated",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigator("/");
      } catch (err) {
        Swal.fire({
          title: "profile update was not successful",
          icon: "error",
        });
        resetForm();
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: registerSchemaReDataUser,
  });

  const deleteAccountHandler = async () => {
    await Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete your account?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((res) => {
      if(res.isConfirmed){
        navigator('/')
        fetchApi.delete(`/users/${userID}`)
        logout()
        Swal.fire({
          icon: 'success',
          title: 'your account deleted',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
    
  }
  return (
    <motion.div whileHover={{scale: 1.1}} className="profile-container row">
          <Col>
            <img src={user.img} className='profile-admin-img' alt="profile" />
          </Col>
          <Col>
            <form className="form-update-profile" onSubmit={form.handleSubmit} bindsubmit="">
              <motion.input whileFocus={{scale: 1.1}}
                className=""
                value={form.values.username}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="username"
                type="text"
                placeholder="Enter username..."
              />
              <motion.div whileTap={{scale: 1.1}} className="password-container-profile">
                <input 
                  value={form.values.password}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  name="password"
                  type={hiddenPassword ? "password" : "text"}
                  placeholder="Enter your password..."
                />
                {hiddenPassword ? (
                  <IoIosEyeOff onClick={() => changeHiddenPassword()} />
                ) : (
                  <IoIosEye onClick={() => changeHiddenPassword()} />
                )}
              </motion.div>
              <motion.input whileFocus={{scale: 1.1}}
                className=""
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="email"
                type="text"
                placeholder="Enter email..."
              />
              <motion.textarea whileFocus={{scale: 1.1}} value={form.values.desc}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="desc"
                placeholder="your biography..."/>
                <div className="btns-container">
              <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type="submit">update</motion.button>
              <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} type="button" onClick={deleteAccountHandler} className="delete-account-btn">delete account</motion.button>
                </div>
            </form>
          </Col>
        </motion.div>
  )
}

export default AdminProfile
