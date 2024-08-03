import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const user = await axios.get(`https://66abc8ddf009b9d5c730532d.mockapi.io/userlist/${params.id}`); // Update to your backend URL
      myFormik.setValues(user.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      address: ""
    },
    validate: (values) => {
      let errors = {};

      if (!values.userName) {
        errors.userName = "Please enter username";
      } else if (values.userName.length < 5) {
        errors.userName = "Name shouldn't be less than 5 letters";
      } else if (values.userName.length > 25) {
        errors.userName = "Name shouldn't be more than 25 letters";
      }

      if (!values.email) {
        errors.email = "Please enter email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = "Please enter phone number";
      } else if (!/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
      }

      if (!values.address) {
        errors.address = "Please enter address";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`https://66abc8ddf009b9d5c730532d.mockapi.io/userlist/${params.id}`, values); // Update to your backend URL
        setLoading(false);
        navigate("/portal/user-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  });

  return (
    <>
      <h3>UserEdit - Id: {params.id}</h3>
      <div className='container'>
        <form onSubmit={myFormik.handleSubmit}>
          <div className='row'>
            <div className="col-lg-6">
              <label>Username</label>
              <input
                name='userName'
                value={myFormik.values.userName}
                onChange={myFormik.handleChange}
                type={"text"}
                className={`form-control ${myFormik.errors.userName ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.userName}</span>
            </div>

            <div className="col-lg-6">
              <label>Email</label>
              <input
                name='email'
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                type={"email"}
                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.email}</span>
            </div>

            <div className='col-lg-6'>
              <label>Phone Number</label>
              <input
                name='phoneNumber'
                value={myFormik.values.phoneNumber}
                onChange={myFormik.handleChange}
                type={"text"}
                className={`form-control ${myFormik.errors.phoneNumber ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.phoneNumber}</span>
            </div>

            <div className='col-lg-6'>
              <label>Address</label>
              <input
                name='address'
                value={myFormik.values.address}
                onChange={myFormik.handleChange}
                type={"text"}
                className={`form-control ${myFormik.errors.address ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.address}</span>
            </div>

            <div className='col-lg-4 mt-3'>
              <input
                disabled={isLoading}
                type="submit"
                value={isLoading ? "Updating..." : "Update"}
                className='btn btn-primary'
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserEdit;
