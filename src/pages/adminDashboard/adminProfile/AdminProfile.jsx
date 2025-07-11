import './AdminProfile.css'
import { Col, Row } from "react-bootstrap";
import profileImg from "../../../assets/images/comment-image.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import { registerSchemaReDataUser } from "../../../utils/register";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fetchApi from "../../../store/server";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
const AdminProfile = () => {
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
    <Row className="profile-container">
          <Col>
            <img src={profileImg} alt="profile" />
          </Col>
          <Col>
            <form className="form-update-profile" onSubmit={form.handleSubmit} bindsubmit="">
              <input
                className=""
                value={form.values.username}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="username"
                type="text"
                placeholder="Enter username..."
              />
              <div className="password-container-profile">
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
              </div>
              <input
                className=""
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="email"
                type="text"
                placeholder="Enter email..."
              />
              <textarea value={form.values.desc}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="desc"
                placeholder="your biography..."/>
                <div className="btns-container">
              <button type="submit">update</button>
              <button type="button" onClick={deleteAccountHandler} className="delete-account-btn">delete account</button>
                </div>
            </form>
          </Col>
        </Row>
  )
}

export default AdminProfile
